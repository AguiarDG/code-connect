import type { ButtonHTMLAttributes } from 'react'

type SocialButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  icon: string
  label: string
}

// The provider images already include the provider name, so the label is
// exposed only to assistive tech.
function SocialButton({
  icon,
  label,
  className = '',
  type = 'button',
  ...props
}: SocialButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={`cursor-pointer rounded transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-primary ${className}`}
      {...props}
    >
      <img src={icon} alt="" className="h-14 w-auto" />
    </button>
  )
}

export default SocialButton
