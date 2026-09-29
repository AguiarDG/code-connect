import { render, screen } from '@testing-library/react'
import Logo from './Logo.tsx'

describe('Logo', () => {
  it('renders as an image named Code Connect', () => {
    render(<Logo />)

    expect(screen.getByRole('img', { name: 'Code Connect' })).toBeInTheDocument()
  })
})
