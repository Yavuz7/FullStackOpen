import { useState } from 'react'

const Blog = ({ blog, setErrorMessage, addLike, user, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likePost = async (event) => {
    const { title, author, url, likes, id } = blog
    const newLikes = likes + 1
    event.preventDefault()
    addLike({
      title: title,
      author: author,
      url: url,
      likes: newLikes,
      id: id,
    })
    setErrorMessage(`Blog ${title} has been liked!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const deletePost = (event) => {
    event.preventDefault()
    removeBlog(blog.id, blog.title)
  }

  const details = (
    <div>
      {blog.url}
      <div>
        {blog.likes}
        <button onClick={likePost} className='likeButton'>Like this post!</button>
      </div>{' '}
      {
        (blog.user && user && blog.user.username === user.username) ? (
          <button onClick={deletePost}>Delete Post</button>
        ) : (
          ''
        )
      }
    </div>
  )
  return (
    <div style={blogStyle} className='Blog'>
      {blog.title}
      {blog.author}
      <button onClick={() => setVisible(!visible)} className='toggleButton'>
        {!visible ? <div>View</div> : <div>close</div>}
      </button>
      {visible && details}{' '}
    </div>
  )
}

export default Blog
