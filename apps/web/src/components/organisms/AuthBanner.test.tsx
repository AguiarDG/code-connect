import { render, screen } from '@testing-library/react'
import AuthBanner from './AuthBanner.tsx'

describe('AuthBanner', () => {
  it('renders the banner image with the logo over it', () => {
    render(<AuthBanner src="/banner-login.png" alt="Pessoa programando" />)

    expect(screen.getByAltText('Pessoa programando')).toHaveAttribute(
      'src',
      '/banner-login.png',
    )
    expect(screen.getByRole('img', { name: 'Code Connect' })).toBeInTheDocument()
  })
})
