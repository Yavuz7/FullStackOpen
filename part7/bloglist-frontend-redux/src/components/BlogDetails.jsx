import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { displayNotif } from "../reducers/notificationReducer";

const BlogDetails = ({ blogs, addLike, user, removeBlog }) => {
  const dispatch = useDispatch();
  const currentId = useParams().id;
  let blog = blogs.find((blogSearch) => blogSearch.id === currentId);
  if (!blog) {
    return null;
  }
  const likePost = async (event) => {
    const { title, author, url, likes, id, comments } = blog;
    const newLikes = likes + 1;
    event.preventDefault();
    addLike({
      title: title,
      author: author,
      url: url,
      likes: newLikes,
      id: id,
      comments: comments,
    });
    dispatch(displayNotif(`Blog ${title} has been liked!`));
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
        <ul>
          <h3>Comments</h3>
          {blog.comments.length > 0 ? (
            blog.comments.map((comment) => (
              <li key={comment.id}>{comment.title}</li>
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
