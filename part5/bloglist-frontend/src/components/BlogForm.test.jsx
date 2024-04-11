import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Test that Blog Form Sends ', async () => {
  const blog = {
    title: 'Eggs on a tuesday',
    author: 'Jim',
    url:'eggs.wwww'
  }

  const createBlog = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={createBlog} setErrorMessage={() => {return}}/>)


  const title = container.querySelector('#title-input')
  const author = container.querySelector('#author-input')
  const url = container.querySelector('#url-input')
  const sendButton = screen.getByText('Create Blog!')


  await userEvent.type(title,blog.title)
  await userEvent.type(author,blog.author)
  await userEvent.type(url,blog.url)

  await user.click(sendButton)

  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
})