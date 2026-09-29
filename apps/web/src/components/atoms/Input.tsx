import type { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
  invalid?: boolean
}

function Input({ invalid = false, className = '', ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`w-full rounded bg-input px-4 py-2.5 text-surface placeholder:text-surface/70 focus-visible:outline-2 focus-visible:outline-primary aria-invalid:outline-2 aria-invalid:outline-red-400 ${className}`}
      {...props}
    />
  )
}

export default Input
