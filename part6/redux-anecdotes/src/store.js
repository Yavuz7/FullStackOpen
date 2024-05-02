import { configureStore } from "@reduxjs/toolkit";

import anecdoteService from "./services/anecdoteService";
import anecdoteReducer, { setQuotes } from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationsReducer";

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notifications: notificationReducer,
  },
});

anecdoteService.getAll().then((quotes) => {
  store.dispatch(setQuotes(quotes));
});
