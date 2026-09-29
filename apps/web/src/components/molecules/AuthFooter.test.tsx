import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import AuthFooter from './AuthFooter.tsx'

describe('AuthFooter', () => {
  it('renders the text and a link to the given route', () => {
    render(
      <MemoryRouter>
        <AuthFooter
          text="Ainda não tem conta?"
          linkText="Crie seu cadastro!"
          to="/cadastro"
        />
      </MemoryRouter>,
    )

    expect(screen.getByText('Ainda não tem conta?')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Crie seu cadastro!' }),
    ).toHaveAttribute('href', '/cadastro')
  })
})
