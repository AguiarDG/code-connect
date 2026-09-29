import { useId, type ComponentProps } from 'react'
import Input from '../atoms/Input.tsx'
import Label from '../atoms/Label.tsx'

type FormFieldProps = Omit<ComponentProps<'input'>, 'id'> & {
  label: string
  error?: string
}

function FormField({ label, error, className = '', ...props }: FormFieldProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
