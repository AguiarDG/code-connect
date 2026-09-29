import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
}

function Button({
  icon,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-primary px-4 py-3 text-lg font-semibold text-surface transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
      {icon}
    </button>
  )
}

export default Button
