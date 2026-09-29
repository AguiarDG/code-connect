import { useState, type FormEvent } from 'react'
import Button from '../atoms/Button.tsx'
import Checkbox from '../atoms/Checkbox.tsx'
import Icon from '../atoms/Icon.tsx'
import Link from '../atoms/Link.tsx'
import FormField from '../molecules/FormField.tsx'

export type LoginFormValues = {
  login: string
  password: string
  remember: boolean
}

type LoginFormErrors = Partial<Record<'login' | 'password', string>>

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void
}

function validate({ login, password }: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {}
  if (!login.trim()) errors.login = 'Informe seu email ou usuário'
  if (!password) errors.password = 'Informe sua senha'
  return errors
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [values, setValues] = useState<LoginFormValues>({
    login: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) onSubmit(values)
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <FormField
        label="Email ou usuário"
        name="login"
        autoComplete="username"
        placeholder="usuario123"
        value={values.login}
        error={errors.login}
        onChange={(event) =>
          setValues({ ...values, login: event.target.value })
        }
      />
      <div className="flex flex-col gap-2">
        <FormField
          label="Senha"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="******"
          value={values.password}
          error={errors.password}
          onChange={(event) =>
            setValues({ ...values, password: event.target.value })
          }
        />
        <div className="flex items-center justify-between">
          <Checkbox
            label="Lembrar-me"
            name="remember"
            checked={values.remember}
            onChange={(event) =>
              setValues({ ...values, remember: event.target.checked })
            }
          />
          <Link to="/esqueci-senha">Esqueci a senha</Link>
        </div>
      </div>
      <Button
        type="submit"
        className="mt-4"
        icon={<Icon name="arrow-right" className="size-5" />}
      >
        Login
      </Button>
    </form>
  )
}

export default LoginForm
