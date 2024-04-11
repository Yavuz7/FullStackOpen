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
    <form onSubmit={addBlog} className='formDiv'>
      <h2>Make a New Blog</h2>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          id='title-input'
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          id='author-input'
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          id='url-input'
        />
      </div>
      <button type="submit">Create Blog!</button>
    </form>
  )
}

export default BlogForm
