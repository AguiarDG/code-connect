import type { ComponentProps } from 'react'

function Label({ className = '', ...props }: ComponentProps<'label'>) {
  return <label className={`block text-lg text-text ${className}`} {...props} />
}

export default Label
