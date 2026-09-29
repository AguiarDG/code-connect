import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SocialButton from './SocialButton.tsx'

describe('SocialButton', () => {
  it('renders the provider image with an accessible name', () => {
    const { container } = render(
      <SocialButton icon="/github.png" label="Entrar com Github" />,
    )

    expect(
      screen.getByRole('button', { name: 'Entrar com Github' }),
    ).toBeInTheDocument()
    expect(container.querySelector('img')).toHaveAttribute('src', '/github.png')
  })

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    render(
      <SocialButton icon="/github.png" label="Entrar com Github" onClick={onClick} />,
    )

    await userEvent.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })
})
