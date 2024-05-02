import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "notifications",
  initialState: "Eggman",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationReducer.actions;
export default notificationReducer.reducer;
