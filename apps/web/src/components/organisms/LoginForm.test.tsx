import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import LoginForm from './LoginForm.tsx'

function renderForm() {
  const onSubmit = vi.fn()
  render(
    <MemoryRouter>
      <LoginForm onSubmit={onSubmit} />
    </MemoryRouter>,
  )
  return { onSubmit }
}

describe('LoginForm', () => {
  it('renders the fields, remember me, forgot password and submit', () => {
    renderForm()

    expect(screen.getByLabelText('Email ou usuário')).toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password')
    expect(screen.getByRole('checkbox', { name: 'Lembrar-me' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Esqueci a senha' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toHaveAttribute('type', 'submit')
  })

  it('submits the typed values', async () => {
    const { onSubmit } = renderForm()

    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'usuario123')
    await userEvent.type(screen.getByLabelText('Senha'), 'segredo')
    await userEvent.click(screen.getByRole('checkbox', { name: 'Lembrar-me' }))
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(onSubmit).toHaveBeenCalledWith({
      login: 'usuario123',
      password: 'segredo',
      remember: true,
    })
  })

  it('shows errors and does not submit when fields are empty', async () => {
    const { onSubmit } = renderForm()

    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByText('Informe seu email ou usuário')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('clears a field error once the user edits that field', async () => {
    renderForm()

    await userEvent.click(screen.getByRole('button', { name: 'Login' }))
    await userEvent.type(screen.getByLabelText('Email ou usuário'), 'u')

    expect(
      screen.queryByText('Informe seu email ou usuário'),
    ).not.toBeInTheDocument()
    expect(screen.getByText('Informe sua senha')).toBeInTheDocument()
  })
})
