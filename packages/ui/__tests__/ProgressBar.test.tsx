import { render, screen } from '@testing-library/react'

import { ProgressBar } from '../src/components/ProgressBar'

describe('ProgressBar', () => {
  it('renders with correct percentage', () => {
    render(<ProgressBar value={50} max={100} label="Test" />)

    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
  })

  it('clamps value above max to 100%', () => {
    render(<ProgressBar value={150} max={100} />)

    const progressbar = screen.getByRole('progressbar')

    expect(progressbar).toHaveAttribute('aria-valuenow', '100')
  })

  it('clamps negative value to 0%', () => {
    render(<ProgressBar value={-10} max={100} />)

    const progressbar = screen.getByRole('progressbar')

    expect(progressbar).toHaveAttribute('aria-valuenow', '0')
  })

  it('handles max = 0 safely', () => {
    render(<ProgressBar value={10} max={0} label="Safe" />)

    expect(screen.getByText('Safe')).toBeInTheDocument()
    expect(screen.getByText('10%')).toBeInTheDocument()
  })

  it('renders without label', () => {
    render(<ProgressBar value={30} />)

    expect(screen.queryByText('%')).not.toBeInTheDocument()
    const progressbar = screen.getByRole('progressbar')

    expect(progressbar).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <ProgressBar value={20} className="custom-class" />
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })
})
