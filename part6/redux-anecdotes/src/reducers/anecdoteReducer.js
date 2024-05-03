import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const changedQuote = action.payload;
      return state.map((quote) =>
        quote.id !== changedQuote.id ? quote : changedQuote
      );
    },
    appendQuote(state, action) {
      state.push(action.payload);
    },
    setQuotes(state, action) {
      return action.payload;
    },
  },
});

export const { addVote, appendQuote, setQuotes } = anecdoteSlice.actions;

export const intializeQuotes = () => {
  return async (dispatch) => {
    const quotes = await anecdoteService.getAll();
    dispatch(setQuotes(quotes));
  };
};

export const newQuote = (content) => {
  return async (dispatch) => {
    const quote = await anecdoteService.createNew(content);
    dispatch(appendQuote(quote));
  };
};

export const increaseVote = (content) => {
  return async (dispatch) => {
    const quote = await anecdoteService.incrementVote(content);
    dispatch(addVote(quote));
  };
};

export default anecdoteSlice.reducer;
