import type { ComponentProps } from 'react'

function Text({ className = '', ...props }: ComponentProps<'p'>) {
  return <p className={`text-text ${className}`} {...props} />
}

export default Text
