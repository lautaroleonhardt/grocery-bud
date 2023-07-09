import { render, screen } from '@testing-library/react'
import Items from '../Items'

describe('Items', () => {
  it('should render all items', () => {
    const items = [
      { id: 1, name: 'item 1', completed: false },
      { id: 2, name: 'item 2', completed: true },
    ]
    const mockRemoveItem = jest.fn()
    const mockEditItem = jest.fn()
    render(<Items items={items} removeItem={mockRemoveItem} editItem={mockEditItem} />)

    expect(screen.getByText(/item 1/i)).toBeInTheDocument()
    expect(screen.getByText(/item 2/i)).toBeInTheDocument()
  })

  it('should not render a list if there are no items', () => {
    const items = []
    const mockRemoveItem = jest.fn()
    const mockEditItem = jest.fn()
    render(<Items items={items} removeItem={mockRemoveItem} editItem={mockEditItem} />)
    const list = screen.queryAllByRole('checkbox')
    expect(list).toHaveLength(0)
  })
})
