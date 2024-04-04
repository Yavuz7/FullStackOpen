import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({
  setBlogs,
  setErrorMessage,
  blogs,
  setBlogCreationVisibile,
}) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      });
      setTitle("");
      setAuthor("");
      setUrl("");
      setBlogs(blogs.concat([blog]));
      setBlogCreationVisibile(false);
      setErrorMessage(`Blog ${blog.title} by ${blog.author} added!`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      setErrorMessage("Blog Couldn't Be Created");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

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
  );
};

export default BlogForm;
