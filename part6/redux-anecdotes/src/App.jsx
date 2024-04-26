import { useSelector, useDispatch } from "react-redux";
import { addVote, newQuote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => {
    return state.sort((q1, q2) => {
      return q2.votes - q1.votes;
    });
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
    console.log("vote", id);
  };

  const addQuote = (event) => {
    event.preventDefault();
    const content = event.target.quote.value;
    event.target.quote.value = "";
    dispatch(newQuote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addQuote}>
        <div>
          <input name="quote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
