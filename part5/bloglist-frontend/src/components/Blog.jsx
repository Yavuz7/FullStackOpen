import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setErrorMessage, addLike }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const likePost = async (event) => {
    const { title, author, url, likes, id } = blog;
    const newLikes = likes + 1;
    event.preventDefault();
    addLike({
      title: title,
      author: author,
      url: url,
      likes: newLikes,
      id: id,
    });
    setErrorMessage(`Blog ${title} has been liked!`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const details = (
    <div>
      {blog.url}
      <div>
        {blog.likes}
        <button onClick={likePost}>Like this post!</button>
      </div>{" "}
      {blog.author}
    </div>
  );
  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setVisible(!visible)}>
        {!visible ? <div>View</div> : <div>close</div>}
      </button>
      {visible && details}{" "}
    </div>
  );
};

export default Blog;
