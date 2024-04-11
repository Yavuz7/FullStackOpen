import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Render Only Name And Author', () => {
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