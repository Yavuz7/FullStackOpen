import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LoginForm from "./components/LoginForm";

import Notification from "./components/notification";
import { displayNotif } from "./reducers/notificationReducer";
import { grabUser, clearUser } from "./reducers/userReducer";
import BlogsLayout from "./components/BlogsLayout";
import Users from "./components/Users";
import UserBlogs from "./components/UserBlogs";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(grabUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    dispatch(clearUser());
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(displayNotif("You Have Been Logged Out!"));
  };
  return (
    <>
      <Notification />
      {user === null ? (
        <>
          <h1>Login Here!</h1>
          <LoginForm />
        </>
      ) : (
        <div>
          <h1>Welcome!</h1>
          <p>
            {user.name} logged-in <button onClick={logout}>Log Out</button>
          </p>
          <Router>
            <div>
              <Link to="/">Blogs</Link>
              <Link to="/users">users</Link>
            </div>

            <Routes>
              <Route path="/users/:id" element={<UserBlogs users={users} />} />
              <Route path="*" element={<BlogsLayout user={user} />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </Router>
        </div>
      )}
    </>
  );
};

export default App;
