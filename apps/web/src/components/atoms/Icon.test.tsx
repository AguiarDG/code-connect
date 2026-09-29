import { render } from '@testing-library/react'
import Icon from './Icon.tsx'

describe('Icon', () => {
  it('renders the requested icon hidden from assistive tech', () => {
    const { container } = render(<Icon name="arrow-right" className="size-4" />)
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('data-icon', 'arrow-right')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveClass('size-4')
  })
})
