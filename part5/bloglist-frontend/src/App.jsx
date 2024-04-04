import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/loginForm";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input value={newBlog} onChange={handleBlogChange} />
      <button type="submit">save</button>
    </form>
  );

  const addBlog = (e) => {};

  const errorDisplay = () => <p>{errorMessage}</p>;

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
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
          blogForm()
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
