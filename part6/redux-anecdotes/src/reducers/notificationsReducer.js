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

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(setNotif(content));
    clearTimeout(currentTimeOutId);
    currentTimeOutId = setTimeout(() => dispatch(clearNotif()), time * 1000);
  };
};

export default notificationReducer.reducer;
