import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
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
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(compareLikes)));
  }, []);

  const errorDisplay = () => <p>{errorMessage}</p>;

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
    setErrorMessage("You Have Been Logged Out!");
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      returnedBlog.user = user;
      setBlogs(blogs.concat([returnedBlog]));
    });
    blogFormRef.current.toggleVisibility();
  };

  const addLike = (blogObject) => {
    blogService.sendLike(blogObject).then(() => {
      const newBlogsList = blogs.map((blog) => {
        if (blog.id === blogObject.id) {
          return blogObject;
        } else {
          return blog;
        }
      });
      setBlogs(newBlogsList.sort(compareLikes));
    });
  };

  const compareLikes = (blogA, blogB) => {
    if (blogA.likes < blogB.likes) {
      return 1;
    } else if (blogA.likes > blogB.likes) {
      return -1;
    } else {
      return 0;
    }
  };

  const removeBlog = (blogId, blogTitle) => {
    if (window.confirm(`Are you sure you want to delete ${blogTitle}?`))
      blogService.deleteBlog(blogId).then(() => {
        const newBlogsList = blogs.filter((blog) => {
          return blog.id !== blogId;
        });
        setBlogs(newBlogsList.sort(compareLikes));
      });
    setErrorMessage(`Blog ${blogTitle} has been deleted!`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  return (
    <>
      <h1>Login Here!</h1>
      {errorMessage !== null && errorDisplay()}
      {user === null ? (
        <LoginForm setErrorMessage={setErrorMessage} setUser={setUser} />
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={logout}>Log Out</button>
          </p>
          <Togglable buttonLabel="Create A Blog" ref={blogFormRef}>
            <BlogForm
              setErrorMessage={setErrorMessage}
              setBlogs={setBlogs}
              blogs={blogs}
              createBlog={addBlog}
            />
          </Togglable>
          <div data-testid="blogsToShow">
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                setErrorMessage={setErrorMessage}
                addLike={addLike}
                removeBlog={removeBlog}
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
