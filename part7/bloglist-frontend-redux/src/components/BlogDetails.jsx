import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { displayNotif } from "../reducers/notificationReducer";
import { addNewComment } from "../reducers/blogsReducer";
import { useState } from "react";

const BlogDetails = ({ blogs, addLike, user, removeBlog }) => {
  const [commentInput, setCommentInput] = useState("");
  const dispatch = useDispatch();
  const currentId = useParams().id;
  let blog = blogs.find((blogSearch) => blogSearch.id === currentId);
  if (!blog) {
    return null;
  }
  const likePost = async (event) => {
    const { title, author, url, likes, id, comments } = blog;
    const commentIds = comments.map((comment) => comment.id);
    const newLikes = likes + 1;
    event.preventDefault();
    addLike({
      title: title,
      author: author,
      url: url,
      likes: newLikes,
      id: id,
      comments: commentIds,
    });
    dispatch(displayNotif(`Blog ${title} has been liked!`));
  };

  const addComment = (event) => {
    event.preventDefault();
    dispatch(addNewComment(blog.id, commentInput));
  };
  const deletePost = (event) => {
    event.preventDefault();
    removeBlog(blog.id, blog.title);
  };
  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a
          rel="noopener noreferrer"
          href={"https://" + blog.url}
          target="_blank"
        >
          {blog.url}
        </a>
        <div>
          {blog.likes}
          <button onClick={likePost} className="likeButton">
            Like this post!
          </button>
        </div>{" "}
        {blog.user && user && blog.user.username === user.username ? (
          <button onClick={deletePost}>Delete Post</button>
        ) : (
          ""
        )}
        <h3>Comments</h3>
        <form onSubmit={addComment}>
          <div>Add a new comment!</div>
          <input
            data-testid="commentInput"
            type="text"
            value={commentInput}
            name="commentInput"
            onChange={({ target }) => setCommentInput(target.value)}
          />
          <button type="submit">Add Comment!</button>
        </form>
        <ul>
          {blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <li key={`${comment.id}-${index}`}>{comment.title}</li>
            ))
          ) : (
            <p>No Comments</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default BlogDetails;
