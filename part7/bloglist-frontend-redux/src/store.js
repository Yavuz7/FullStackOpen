import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import alluserReducer from "./reducers/alluserReducer";
export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    allUsers: alluserReducer,
  },
});
