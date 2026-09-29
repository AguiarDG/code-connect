import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Link from './Link.tsx'

describe('Link', () => {
  it('renders an anchor pointing to the route', () => {
    render(
      <MemoryRouter>
        <Link to="/cadastro" icon={<span data-testid="icon" />}>
          Crie seu cadastro!
        </Link>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole('link', { name: 'Crie seu cadastro!' }),
    ).toHaveAttribute('href', '/cadastro')
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
