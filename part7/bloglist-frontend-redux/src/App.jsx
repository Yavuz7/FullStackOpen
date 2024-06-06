import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import Notification from "./components/notification";
import { displayNotif } from "./reducers/notificationReducer";
import {
  getAllBlogsSorted,
  addNewBlog,
  likeBlog,
  removeBlog,
} from "./reducers/blogsReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();
  useEffect(() => {
    dispatch(getAllBlogsSorted());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(displayNotif("You Have Been Logged Out!"));
  };

  const addBlog = (blogObject, user) => {
    dispatch(addNewBlog(blogObject, user));
    blogFormRef.current.toggleVisibility();
  };

  const addLike = (blogObject) => {
    dispatch(likeBlog(blogObject));
  };

  const deleteBlog = (blogId, blogTitle) => {
    if (window.confirm(`Are you sure you want to delete ${blogTitle}?`)) {
      dispatch(removeBlog(blogId));
      dispatch(displayNotif(`Blog ${blogTitle} has been deleted!`));
    }
  };
  return (
    <>
      <h1>Login Here!</h1>
      <Notification />
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={logout}>Log Out</button>
          </p>
          <Togglable buttonLabel="Create A Blog" ref={blogFormRef}>
            <BlogForm blogs={blogs} createBlog={addBlog} />
          </Togglable>
          <div data-testid="blogsToShow">
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
                removeBlog={deleteBlog}
                user={user}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
