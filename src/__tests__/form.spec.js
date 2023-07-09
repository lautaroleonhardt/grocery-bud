import { render, screen, fireEvent } from '@testing-library/react'
import user from '@testing-library/user-event'
import Form from '../Form'
import { toast } from 'react-toastify'

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}))

describe('Form', () => {
  const mock = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render a heading', () => {
    render(<Form />)
    expect(screen.getByRole('heading', { name: /grocery bud/i })).toBeInTheDocument()
  })

  it('should render an input', () => {
    render(<Form />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render a button', () => {
    render(<Form />)
    expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument()
  })

  it('should render the input field with an empty value', () => {
    render(<Form />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveValue('')
  })

  it('should render the input field with a value', async () => {
    render(<Form />)
    const inputElement = screen.getByRole('textbox')
    await user.type(inputElement, 'item 1')
    expect(inputElement).toHaveValue('item 1')
  })

  it('should call addItem with the correct value when form is submitted', async () => {
    render(<Form addItem={mock} />)

    const inputElement = screen.getByRole('textbox')
    const submitButton = screen.getByRole('button', { name: /add item/i })

    await user.click(inputElement)
    await user.keyboard('item 1')
    await user.click(submitButton)

    expect(mock).toHaveBeenCalledTimes(1)
    expect(mock).toHaveBeenCalledWith('item 1')
  })

  it('should display an error message when submitted with an empty value', async () => {
    render(<Form addItem={mock} />)

    const submitButton = screen.getByRole('button', { name: /add item/i })
    await user.click(submitButton)

    expect(toast.error).toHaveBeenCalledWith('please provide value')
  })

  it('should not call addItem when submitted with an empty value', async () => {
    render(<Form addItem={mock} />)

    const submitButton = screen.getByRole('button', { name: /add item/i })
    await user.click(submitButton)

    expect(mock).not.toHaveBeenCalled()
  })

  it('calls e.preventDefault() when the form is submitted', () => {
    render(<Form addItem={mock} />)

    const formElement = screen.getByTestId('form')

    const submitEvent = new Event('submit', { cancelable: true })
    Object.defineProperty(submitEvent, 'defaultPrevented', {
      get: jest.fn(() => true),
    })

    fireEvent.submit(formElement, submitEvent)

    expect(submitEvent.defaultPrevented).toBe(true)
  })

  it('should clear the input field when the form is submitted', async () => {
    render(<Form addItem={mock} />)

    const inputElement = screen.getByRole('textbox')
    const submitButton = screen.getByRole('button', { name: /add item/i })

    await user.click(inputElement)
    await user.keyboard('item 1')
    await user.click(submitButton)

    expect(inputElement).toHaveValue('')
  })
})
