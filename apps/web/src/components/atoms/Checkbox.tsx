import { useId, type ComponentProps } from 'react'
import Icon from './Icon.tsx'

type CheckboxProps = Omit<ComponentProps<'input'>, 'type'> & {
  label: string
}

function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex cursor-pointer items-center gap-2 text-muted ${className}`}
    >
      <span className="relative inline-flex">
        <input
          id={inputId}
          type="checkbox"
          className="peer size-5 cursor-pointer appearance-none rounded border border-muted checked:border-primary focus-visible:outline-2 focus-visible:outline-primary"
          {...props}
        />
        <Icon
          name="check"
          className="pointer-events-none absolute inset-0 m-auto hidden size-4 text-primary peer-checked:block"
        />
      </span>
      {label}
    </label>
  )
}

export default Checkbox
