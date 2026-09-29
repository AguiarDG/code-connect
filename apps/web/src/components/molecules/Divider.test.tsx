import { render, screen } from '@testing-library/react'
import Divider from './Divider.tsx'

describe('Divider', () => {
  it('renders its text', () => {
    render(<Divider>ou entre com outras contas</Divider>)

    expect(screen.getByText('ou entre com outras contas')).toBeInTheDocument()
  })
})
