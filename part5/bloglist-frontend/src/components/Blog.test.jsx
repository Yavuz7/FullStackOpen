import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Render Only Name And Author', async () => {
  const blog = {
    title: 'Eggs on a tuesday',
    author: 'Jim',
    likes: 7,
    url:'eggs.wwww'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.Blog')
  expect(div).toHaveTextContent('Jim')
  expect(div).toHaveTextContent('Eggs on a tuesday')
  expect(div).not.toHaveTextContent('eggs.wwww')
  expect(div).not.toHaveTextContent(7)
})

test('Render All Blog Parts When Button Is clicked', async () => {
  const blog = {
    title: 'Eggs on a tuesday',
    author: 'Jim',
    likes: 7,
    url:'eggs.wwww'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.Blog')
  const user = userEvent.setup()
  const button = container.querySelector('.toggleButton')
  await user.click(button)

  expect(div).toHaveTextContent('Jim')
  expect(div).toHaveTextContent('Eggs on a tuesday')
  expect(div).toHaveTextContent('eggs.wwww')
  expect(div).toHaveTextContent(7)
})

test('Check if likes event handler is called twice', async () => {
  const blog = {
    title: 'Eggs on a tuesday',
    author: 'Jim',
    likes: 7,
    url:'eggs.wwww'
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} addLike={mockHandler} setErrorMessage={() => {return}}/>)

  const div = container.querySelector('.Blog')
  const user = userEvent.setup()
  const button = container.querySelector('.toggleButton')
  await user.click(button)
  const likeButton = container.querySelector('.likeButton')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})