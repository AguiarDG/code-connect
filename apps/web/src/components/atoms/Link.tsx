import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router'
import type { ReactNode } from 'react'

type LinkProps = RouterLinkProps & {
  variant?: 'underline' | 'primary'
  icon?: ReactNode
}

const variants = {
  underline: 'text-text underline underline-offset-2 hover:text-primary',
  primary: 'text-xl text-primary hover:underline',
}

function Link({
  variant = 'underline',
  icon,
  children,
  className = '',
  ...props
}: LinkProps) {
  return (
    <RouterLink
      className={`inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-primary ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon}
    </RouterLink>
  )
}

export default Link
