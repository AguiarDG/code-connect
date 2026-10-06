# Página de Login (apps/web)

## Context
`apps/web` ainda é o scaffold do Vite. Vamos implementar a tela de Login do mock (card escuro com banner à esquerda e formulário à direita, elos decorativos no fundo), seguindo Atomic Design. A tela de Cadastro virá depois com o **mesmo layout base**, outro banner e outros campos — então layout, card e peças de formulário ficam genéricos e a parte específica do login fica isolada em `LoginForm` + `LoginPage`.

Decisões (confirmadas): logo "code connect" e elos do fundo recriados em SVG inline; `react-router` com `/login` (e link para `/cadastro`, ainda sem página); submit chama um `onSubmit` tipado (sem API por ora).

Observação sobre assets: `github.png` (80×110) e `gmail.png` (66×102) **já contêm o rótulo** ("Github"/"Gmail") na imagem → não renderizar texto extra, usar `aria-label`/`alt`. `banner-login.png` (814×1256) não tem logo → sobrepor o atom `Logo`.

## 1. Setup (pré-requisito do CLAUDE.md)
- `pnpm web add react-router`
- `pnpm web add -D tailwindcss @tailwindcss/vite vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom`
- `vite.config.ts`: plugin `tailwindcss()`; bloco `test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.ts' }` (usar `defineConfig` de `vitest/config`).
- `src/test/setup.ts`: `import '@testing-library/jest-dom/vitest'` + `cleanup` afterEach.
- `tsconfig.app.json`: `types: ["vite/client", "vitest/globals", "@testing-library/jest-dom"]`.
- `package.json`: scripts `"test": "vitest run"`, `"test:watch": "vitest"`; root `package.json`: `"web:test": "pnpm --filter web test"`.
- `src/index.css` → substituir por `@import 'tailwindcss';` + `@theme` com tokens do design:
  - `--color-bg: #01080E`, `--color-surface: #171D1F`, `--color-primary: #81FE88`, `--color-input: #888888`, `--color-text: #E1E1E1`, `--color-muted: #BCBCBC`, `--color-decor: #0B1A1F` (elos)
  - `--font-sans: 'Prompt', sans-serif` (Google Fonts no `index.html`), `--font-mono` para o logo.
- Remover `App.css`, `src/assets/*` do template; `index.html` com `lang="pt-BR"` e title "Code Connect".
- Atualizar CLAUDE.md (Web conventions/Commands): Tailwind v4 + Vitest instalados, `pnpm web:test`.

## 2. Componentes (`src/components/`)
Cada um com `X.test.tsx` ao lado (render + interação).

**atoms/**
- `Button` — variantes `primary` (verde, texto escuro, bold) ; aceita `icon` à direita; repassa props de `<button>`.
- `Input` — input cinza (`bg-input`), repassa props/ref (React 19 `ref` como prop).
- `Label` — `<label>` estilizado.
- `Checkbox` — checkbox verde com label ("Lembrar-me").
- `Link` — wrapper sobre `react-router` `Link`, variantes `underline` (Esqueci a senha) e `primary` (Crie seu cadastro!, verde + ícone).
- `Heading` / `Text` — título "Login" e subtítulo.
- `Logo` — ícone de elo SVG + "code / connect" em mono.
- `Icon` — SVGs inline: `ArrowRight`, `Clipboard`, `ChainLink` (usado no Logo e no fundo).
- `SocialButton` — `<button>` com `<img src>`; props `icon`, `label` (vai para `aria-label`/`alt`), `onClick`.

**molecules/**
- `FormField` — `Label` + `Input` com `id` via `useId`, mensagem de erro opcional. Reusável no cadastro (nome, email, senha…).
- `Divider` — linhas + texto central ("ou entre com outras contas").
- `SocialLogin` — `Divider` + lista de `SocialButton` (GitHub, Gmail) com `onSelect(provider)`.
- `AuthFooter` — texto ("Ainda não tem conta?") + `Link` primary com ícone; recebe texto/rota por props (no cadastro vira "Já tem conta? Faça login").

**organisms/**
- `LoginForm` — `FormField` email/usuário + senha, linha `Checkbox` + "Esqueci a senha", `Button` "Login →". Estado controlado; valida obrigatórios; chama `onSubmit({ login, password, remember })`.
- `AuthBanner` — `<img>` do banner (object-cover) + `Logo` sobreposto na base; prop `src`/`alt`.

**templates/**
- `AuthTemplate` — fundo `bg-bg` com elos decorativos (SVG absoluto, `aria-hidden`), card `bg-surface rounded-3xl` com grid 2 colunas: slot `banner` à esquerda; à direita `title`, `subtitle`, `children` (form), `footer` slots. Responsivo: em telas < md o banner some/fica em cima e o card ocupa a largura com gutter.

**pages/**
- `LoginPage` — `AuthTemplate` com `AuthBanner src="/banner-login.png"`, título "Login", subtítulo "Boas-vindas! Faça seu login.", `LoginForm` (onSubmit → `console.info` + TODO), `SocialLogin` e `AuthFooter` → `/cadastro`.

## 3. Rotas
- `src/App.tsx`: `BrowserRouter` + `Routes`: `/login` → `LoginPage`, `/` → `<Navigate to="/login" />`. `/cadastro` fica para a próxima tarefa (futuro `SignupPage` = `AuthTemplate` + `AuthBanner` com outro banner + `SignupForm`).

## Testes essenciais
- atoms: renderizam conteúdo/atributos, `Button`/`SocialButton` chamam `onClick`, `Checkbox` alterna.
- `FormField`: label associado ao input (`getByLabelText`), mostra erro.
- `LoginForm`: digitar + marcar + submit chama `onSubmit` com os valores; submit vazio mostra erros e não chama.
- `SocialLogin`: clicar GitHub chama `onSelect('github')`.
- `AuthTemplate`: renderiza slots. `LoginPage`: renderiza título, campos e link para `/cadastro` (dentro de `MemoryRouter`).

## Verificação
- `pnpm web:test` — todos verdes.
- `pnpm web:lint` e `pnpm web:build` — sem erros.
- `pnpm web:dev` e abrir `/login`: comparar visualmente com o mock (desktop ~1920px e mobile ~375px).

Commits sugeridos: `build(web): set up tailwind and vitest`, `feat(web): add auth atoms and molecules`, `feat(web): add login page`.
