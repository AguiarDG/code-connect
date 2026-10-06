# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

pnpm workspace (`pnpm-workspace.yaml` → `apps/*`, pnpm 12) with two apps that are currently scaffolds:

- `apps/api` — NestJS 12 backend (Express platform), tested with Vitest, linted with oxlint, formatted with Prettier.
- `apps/web` — React 19 + Vite 8 frontend with React Router, Tailwind CSS v4 and Vitest + Testing Library, linted with ESLint (flat config). No formatter configured yet.

The apps don't share code or packages yet, and the web app does not call the API yet.

## Commands

Run from the repo root (these wrap `pnpm --filter <app>`):

```bash
pnpm install
pnpm api:dev          # nest start --watch (PORT env, default 3000)
pnpm api:build        # nest build → apps/api/dist (deletes dist first)
pnpm api:start
pnpm api:test         # vitest run (unit, **/*.spec.ts)
pnpm api:lint         # oxlint --type-aware src/ test/
pnpm web:dev          # vite dev server
pnpm web:build        # tsc -b && vite build
pnpm web:preview
pnpm web:lint
pnpm web:test         # vitest run (jsdom, **/*.test.tsx)
```

Any other app script: `pnpm api <script>` / `pnpm web <script>`, e.g. `pnpm api test:e2e`, `pnpm api format`, `pnpm api test:cov`, `pnpm api start:prod` (runs `node dist/main`).

Single test (API): `pnpm api exec vitest run src/app.controller.spec.ts` or filter by name with `-t "should return"`. E2E tests (`test/**/*.e2e-spec.ts`) use a separate config: `pnpm api exec vitest run --config ./vitest.config.e2e.ts`.

## API conventions

- ESM package (`"type": "module"`, `module: nodenext`): relative imports **must** use the `.js` extension (e.g. `import { AppService } from './app.service.js'`), even from `.ts` files. `main.ts` uses top-level `await`.
- Vitest runs with `globals: true` (`describe`/`it`/`expect` are not imported); tests build modules via `@nestjs/testing`'s `Test.createTestingModule`.
- oxlint enforces `typescript/no-floating-promises` as an error; `no-explicit-any` is off.
- Prettier: single quotes, trailing commas.
- `AppModule` registers `@nestjs/observe` (`createObserveModule`) and `main.ts` passes its `ObserveInstrument` to `NestFactory.create`. The `appKey`/`appSecret` in `app.module.ts` are placeholders.
- Build gotcha: `tsconfig.json` has `incremental: true`, and `apps/api/tsconfig.build.tsbuildinfo` is tracked in git and lives outside `dist/`. `nest build` deletes `dist/` (`deleteOutDir`), so a stale tsbuildinfo can make tsc skip emitting and leave `dist/` empty. If that happens, delete the tsbuildinfo and rebuild.
- `apps/api` has its own stray `pnpm-lock.yaml`; the root `pnpm-lock.yaml` is the one the workspace uses.

## Web conventions

- Code style follows the Vite template: no semicolons, single quotes, and local imports keep their `.tsx` extension (e.g. `import App from './App.tsx'`).
- TypeScript uses project references: `tsconfig.app.json` covers `src/` and `tsconfig.node.json` covers `vite.config.ts`. That is why the build runs `tsc -b`.
- Components follow **Atomic Design**, organized under `src/components/` by level:
  - `atoms/`: smallest building blocks such as buttons, inputs and labels. They hold no business logic.
  - `molecules/`: small groups of atoms that form one unit, such as a labeled input or a search field.
  - `organisms/`: larger sections built from molecules and atoms, such as a header or a form.
  - `templates/`: page layouts that arrange organisms, with no real data.
  - `pages/`: templates filled with real data and state.

  A component may import only from its own level or lower levels, never from a higher one.
- Style with **Tailwind CSS** utility classes. Don't add new component-level `.css` files.
- **Every component must have a test** that covers its essential behavior: what it renders and how it responds to user interaction. Put the test next to the component (`Button.tsx` → `Button.test.tsx`).
- Tailwind v4 runs through `@tailwindcss/vite`; design tokens (colors `bg`, `surface`, `primary`, `input`, `text`, `muted`, `decor` and fonts Prompt/Space Mono) live in the `@theme` block of `src/index.css`.
- Vitest is configured in `vite.config.ts` (jsdom, `globals: true`, setup in `src/test/setup.ts` loads jest-dom matchers). Components that render router links need a `MemoryRouter` in tests.
- Routes live in `src/App.tsx`. Auth screens share `templates/AuthTemplate` (banner, title, subtitle, form and footer slots) plus `organisms/AuthBanner`; a new auth page only needs its own banner image and form organism.

## API: REST conventions

The API must follow REST principles:

- **Resources are nouns in the plural** in kebab-case (`/users`, `/code-reviews`), never verbs (`/getUsers`). Express relationships by nesting at most one level (`/users/:userId/posts`).
- **HTTP methods carry the semantics**:
  - `GET` reads and never has side effects.
  - `POST` creates a resource.
  - `PUT` replaces a resource entirely.
  - `PATCH` updates part of a resource.
  - `DELETE` removes a resource.

  `GET`, `PUT` and `DELETE` must be idempotent.
- **Status codes must be accurate**:
  - `200` for a successful read or update.
  - `201` for a create. Include a `Location` header that points to the new resource.
  - `204` for a response with no body, such as a delete.
  - `400` for a malformed request and `422` for failed validation.
  - `401` for a missing or invalid login and `403` for a request the user isn't allowed to make.
  - `404` for a resource that doesn't exist and `409` for a conflict.
  - `500` only for unexpected errors.

  In Nest, set the code with `@HttpCode()` and use the built-in `HttpException` subclasses.
- **Requests and responses are JSON**. Field names are camelCase. Errors use one consistent shape across the API.
- **Collections support pagination, filtering and sorting through query parameters** (`?page=&limit=&sort=`), never through the path.
- **Keep the API stateless**: each request carries everything the server needs, such as its auth token.
- **Version the API in the path** (`/v1/...`).
- Validate input with `class-validator` DTOs that live next to their controller. `AppModule` registers a global `ValidationPipe` through `APP_PIPE`, not in `main.ts`, so tests built from `AppModule` use it too. The pipe:
  - strips unknown fields and rejects requests that send any;
  - converts payloads into DTO instances;
  - responds `422` when validation fails.

## Git

Both apps use **Conventional Commits**: `<type>(<scope>): <description>`.

- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `perf`, `build`, `ci`, `chore`, `revert`.
- Scope is the app: `api`, `web`, or omit it for changes to the whole workspace, e.g. `feat(web): add Button atom`, `fix(api): return 404 for missing user`.
- Write the description in the imperative, in lowercase, with no trailing period. Mark breaking changes with `!` (`feat(api)!: ...`) or a `BREAKING CHANGE:` footer.
