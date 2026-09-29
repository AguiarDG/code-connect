import Icon from './Icon.tsx'

type LogoProps = {
  className?: string
}

function Logo({ className = '' }: LogoProps) {
  return (
    <div
      role="img"
      aria-label="Code Connect"
      className={`inline-flex items-center gap-2 text-text ${className}`}
    >
      <Icon name="chain-link" className="h-8 w-6 text-primary" />
      <span className="flex flex-col font-mono text-2xl leading-none">
        <span>code</span>
        <span>connect</span>
      </span>
    </div>
  )
}

export default Logo
