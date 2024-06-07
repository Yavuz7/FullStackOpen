import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userReducer = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload;
    },
  },
});

export const { setAllUsers } = userReducer.actions;

export const grabAllUsers = () => {
  return async (dispatch) => {
    const allUsers = await userService.getAll();
    console.log("Users: ", allUsers);
    dispatch(setAllUsers(allUsers));
  };
};

export default userReducer.reducer;
