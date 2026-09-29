import { render, screen } from '@testing-library/react'
import App from './App.tsx'

describe('App', () => {
  it('redirects unknown routes to the login page', async () => {
    window.history.pushState({}, '', '/rota-inexistente')

    render(<App />)

    expect(
      await screen.findByRole('heading', { name: 'Login' }),
    ).toBeInTheDocument()
    expect(window.location.pathname).toBe('/login')
  })
})
