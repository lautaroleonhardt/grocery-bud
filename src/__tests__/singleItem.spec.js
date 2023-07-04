import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import SingleItem from '../SingleItem'

describe('SingleItem', () => {
  let item
  const mockRemoveItem = jest.fn()
  const mockEditItem = jest.fn()

  describe('when item is not completed', () => {
    beforeEach(() => {
      item = { id: 1, name: 'test', completed: false }
      render(<SingleItem item={item} removeItem={mockRemoveItem} editItem={mockEditItem} />)
    })

    it('should render the item name', () => {
      expect(screen.getByText(/test/i)).toBeInTheDocument()
    })

    it('should render edit button', () => {
      expect(screen.getByRole('button', /edit/i)).toBeInTheDocument()
    })

    it('should render remove button', () => {
      expect(screen.getByRole('button', /remove/i)).toBeInTheDocument()
    })

    it('should call removeItem when remove button is clicked', async () => {
      const removeButton = screen.getByRole('button', /remove/i)
      await user.click(removeButton)
      expect(mockRemoveItem).toHaveBeenCalledTimes(1)
    })

    it('should call editItem when edit button is clicked', async () => {
      const editButton = screen.getByRole('checkbox')
      await user.click(editButton)
      expect(mockEditItem).toHaveBeenCalledTimes(1)
    })

    it('should not render line-through decoration if item is not completed', () => {
      const item = screen.getByText('test')
      expect(item).not.toHaveStyle('text-decoration: line-through')
    })
  })

  describe('when item is completed', () => {
    beforeEach(() => {
      item = { id: 1, name: 'test', completed: true }
      render(<SingleItem item={item} removeItem={mockRemoveItem} editItem={mockEditItem} />)
    })

    it('should render line-through decoration if item is completed', () => {
      const item = screen.getByText('test')
      expect(item).toHaveStyle('text-decoration: line-through')
    })
  })
})
