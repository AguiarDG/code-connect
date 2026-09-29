import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SocialLogin from './SocialLogin.tsx'

describe('SocialLogin', () => {
  it('renders the divider and one button per provider', () => {
    render(<SocialLogin onSelect={() => {}} />)

    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it.each([
    ['Entrar com Github', 'github'],
    ['Entrar com Gmail', 'google'],
  ])('clicking "%s" selects %s', async (name, provider) => {
    const onSelect = vi.fn()
    render(<SocialLogin onSelect={onSelect} />)

    await userEvent.click(screen.getByRole('button', { name }))

    expect(onSelect).toHaveBeenCalledWith(provider)
  })
})
