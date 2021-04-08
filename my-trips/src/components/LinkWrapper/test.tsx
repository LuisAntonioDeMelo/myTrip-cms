import { render, screen } from '@testing-library/react'
import LinkWrapper from '.'

describe('<LinkWrapper />', () => {
  it('should render an children', () => {
    render(<LinkWrapper href="/my-link">qualquer coisa</LinkWrapper>)

    const children = screen.getByText(/qualquer coisa/i)
    expect(children).toBeInTheDocument()
    expect(children).toHaveAttribute('href', '/my-link')

    screen.logTestingPlaygroundURL()
  })
})
