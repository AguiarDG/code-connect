import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkbox from './Checkbox.tsx'

describe('Checkbox', () => {
  it('renders an accessible checkbox with its label', () => {
    render(<Checkbox label="Lembrar-me" />)

    expect(
      screen.getByRole('checkbox', { name: 'Lembrar-me' }),
    ).not.toBeChecked()
  })

  it('toggles when its label is clicked', async () => {
    const onChange = vi.fn()
    render(<Checkbox label="Lembrar-me" onChange={onChange} />)

    await userEvent.click(screen.getByText('Lembrar-me'))

    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(onChange).toHaveBeenCalledOnce()
  })
})
