import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/LoginForm";

import Notification from "./components/notification";
import { displayNotif } from "./reducers/notificationReducer";
import { grabUser, clearUser } from "./reducers/userReducer";
import BlogsLayout from "./components/BlogsLayout";
import Users from "./components/Users";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
      <h1>Login Here!</h1>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={logout}>Log Out</button>
          </p>
          {/* <BlogsLayout /> */}
          {<Users />}
        </div>
      )}
    </>
  );
};

export default App;
