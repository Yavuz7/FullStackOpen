import { useState } from 'react'

const BlogForm = ({ setErrorMessage, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')
    setErrorMessage(`Blog ${title} by ${author} added!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Make a New Blog</h2>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create Blog!</button>
    </form>
  )
}

export default BlogForm
