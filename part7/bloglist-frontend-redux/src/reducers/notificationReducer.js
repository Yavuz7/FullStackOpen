import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notifications",
  initialState: "",
  reducers: {
    setNotif(state, action) {
      return action.payload;
    },
    clearNotif() {
      return "";
    },
  },
});

export const { setNotif, clearNotif } = notificationReducer.actions;

let currentTimeOutId;

export const displayNotif = (content) => {
  return async (dispatch) => {
    dispatch(setNotif(content));
    clearTimeout(currentTimeOutId);
    currentTimeOutId = setTimeout(() => dispatch(clearNotif()), 5000);
  };
};

export default notificationReducer.reducer;
