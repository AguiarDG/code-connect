import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button.tsx'

describe('Button', () => {
  it('renders its label and icon', () => {
    render(<Button icon={<span data-testid="icon" />}>Login</Button>)

    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('defaults to type button', () => {
    render(<Button>Login</Button>)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Login</Button>)

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })
})
