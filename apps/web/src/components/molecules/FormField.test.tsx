import { render, screen } from '@testing-library/react'
import FormField from './FormField.tsx'

describe('FormField', () => {
  it('associates the label with the input', () => {
    render(<FormField label="Senha" type="password" />)

    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
  })

  it('shows the error and links it to the input', () => {
    render(<FormField label="Senha" error="Informe a senha" />)
    const input = screen.getByLabelText('Senha')

    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Informe a senha')
  })

  it('renders no error by default', () => {
    render(<FormField label="Senha" />)

    expect(screen.getByLabelText('Senha')).not.toHaveAttribute('aria-invalid')
  })
})
