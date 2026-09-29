import type { ReactNode, SVGProps } from 'react'

export type IconName = 'arrow-right' | 'check' | 'clipboard' | 'chain-link'

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName
}

const paths: Record<IconName, { viewBox: string; content: ReactNode }> = {
  'arrow-right': {
    viewBox: '0 0 24 24',
    content: (
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  check: {
    viewBox: '0 0 24 24',
    content: (
      <path
        d="m5 12 5 5 9-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  clipboard: {
    viewBox: '0 0 24 24',
    content: (
      <path
        fill="currentColor"
        d="M9 2h6a1 1 0 0 1 1 1v1h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2V3a1 1 0 0 1 1-1Zm1 2v2h4V4h-4ZM8 10v2h8v-2H8Zm0 4v2h8v-2H8Zm0 4v1h5v-1H8Z"
      />
    ),
  },
  'chain-link': {
    viewBox: '0 0 48 64',
    content: (
      <g fill="none" stroke="currentColor" strokeWidth="6">
        <rect x="3" y="21" width="22" height="40" rx="11" />
        <rect x="23" y="3" width="22" height="40" rx="11" />
      </g>
    ),
  },
}

function Icon({ name, ...props }: IconProps) {
  const { viewBox, content } = paths[name]
  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      data-icon={name}
      {...props}
    >
      {content}
    </svg>
  )
}

export default Icon
