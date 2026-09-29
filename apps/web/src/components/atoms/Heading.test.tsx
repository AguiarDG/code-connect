import { render, screen } from '@testing-library/react'
import Heading from './Heading.tsx'

describe('Heading', () => {
  it('renders a level 1 heading', () => {
    render(<Heading>Login</Heading>)

    expect(screen.getByRole('heading', { level: 1, name: 'Login' })).toBeInTheDocument()
  })
})
