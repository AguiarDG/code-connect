import { render, screen } from '@testing-library/react'
import Label from './Label.tsx'

describe('Label', () => {
  it('renders its text bound to a control', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    )

    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email')
  })
})
