import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import SingleItem from '../SingleItem'

describe('SingleItem', () => {
  let item, mock

  beforeEach(() => {
    item = { id: 1, name: 'test', completed: false }
    mock = jest.fn()
    render(<SingleItem item={item} removeItem={mock} editItem={mock} />)
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
    expect(mock).toHaveBeenCalledTimes(1)
  })

  it('should call editItem when edit button is clicked', async () => {
    const editButton = screen.getByRole('button', /edit/i)
    await user.click(editButton)
    expect(mock).toHaveBeenCalledTimes(1)
  })
})
