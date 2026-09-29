import { render, screen } from '@testing-library/react'
import AuthTemplate from './AuthTemplate.tsx'

describe('AuthTemplate', () => {
  it('renders the title, subtitle and every slot', () => {
    render(
      <AuthTemplate
        banner={<div>banner</div>}
        title="Login"
        subtitle="Boas-vindas! Faça seu login."
        footer={<div>footer</div>}
      >
        <form aria-label="form" />
      </AuthTemplate>,
    )

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByText('Boas-vindas! Faça seu login.')).toBeInTheDocument()
    expect(screen.getByText('banner')).toBeInTheDocument()
    expect(screen.getByRole('form', { name: 'form' })).toBeInTheDocument()
    expect(screen.getByText('footer')).toBeInTheDocument()
  })
})
