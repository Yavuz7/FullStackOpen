import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    newQuote(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      const id = action.payload;
      const quoteToAddVoteTo = state.find((q) => q.id === id);
      const changedQuote = {
        ...quoteToAddVoteTo,
        votes: quoteToAddVoteTo.votes + 1,
      };
      return state.map((quote) => (quote.id !== id ? quote : changedQuote));
    },
    appendQuote(state, action) {
      state.push(action.payload);
    },
    setQuotes(state, action) {
      return action.payload;
    },
  },
});

export const { newQuote, addVote, appendQuote, setQuotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
