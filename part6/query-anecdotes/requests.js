import axios from "axios";

let baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) => {
  axios
    .post(baseUrl, newAnecdote)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const updateAnecdote = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
