import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input.tsx'

describe('Input', () => {
  it('renders with the given placeholder', () => {
    render(<Input placeholder="usuario123" />)

    expect(screen.getByPlaceholderText('usuario123')).toBeInTheDocument()
  })

  it('accepts typed text', async () => {
    render(<Input aria-label="Email" />)
    const input = screen.getByLabelText('Email')

    await userEvent.type(input, 'ana')

    expect(input).toHaveValue('ana')
  })

  it('flags invalid state', () => {
    render(<Input aria-label="Email" invalid />)

    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
  })
})
