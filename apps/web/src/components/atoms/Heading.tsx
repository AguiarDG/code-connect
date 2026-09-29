import type { ComponentProps } from 'react'

function Heading({ className = '', ...props }: ComponentProps<'h1'>) {
  return (
    <h1 className={`text-4xl font-semibold text-text ${className}`} {...props} />
  )
}

export default Heading
