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
export default notificationReducer.reducer;
