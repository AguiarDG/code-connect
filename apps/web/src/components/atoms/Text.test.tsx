import { render, screen } from '@testing-library/react'
import Text from './Text.tsx'

describe('Text', () => {
  it('renders a paragraph with its content', () => {
    render(<Text>Boas-vindas! Faça seu login.</Text>)

    expect(screen.getByText('Boas-vindas! Faça seu login.').tagName).toBe('P')
  })
})
