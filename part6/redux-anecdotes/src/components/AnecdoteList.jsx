import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, aFilter }) => {
    const filter = aFilter.filter.toLowerCase();
    if (filter.length > 0) {
      const filteredAnecdotes = anecdotes.filter((q) => {
        return q.content.toLowerCase().includes(filter);
      });
      return filteredAnecdotes.sort((q1, q2) => {
        return q2.votes - q1.votes;
      });
    } else {
      return anecdotes.sort((q1, q2) => {
        return q2.votes - q1.votes;
      });
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(addVote(id));
    console.log("vote", id);
  };

  return (
    <>
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
    </>
  );
};

export default AnecdoteList;