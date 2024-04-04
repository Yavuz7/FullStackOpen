import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [blogCreationVisibile, setBlogCreationVisibile] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const errorDisplay = () => <p>{errorMessage}</p>;

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
    setErrorMessage(`You Have Been Logged Out!`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const hideWhenVisible = { display: blogCreationVisibile ? "none" : "" };
  const showWhenVisible = { display: blogCreationVisibile ? "" : "none" };

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
          <div style={hideWhenVisible}>
            <button onClick={() => setBlogCreationVisibile(true)}>
              Create a new Blog!
            </button>
          </div>
          <div style={showWhenVisible}>
            <BlogForm
              setErrorMessage={setErrorMessage}
              setBlogs={setBlogs}
              blogs={blogs}
              setBlogCreationVisibile={setBlogCreationVisibile}
            />
            <button onClick={() => setBlogCreationVisibile(false)}>
              Cancel
            </button>
          </div>

          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
