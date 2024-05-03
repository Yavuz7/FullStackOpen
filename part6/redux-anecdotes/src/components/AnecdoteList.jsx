import { useSelector, useDispatch } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationsReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const lowerCasefilter = filter.toLowerCase();
    if (lowerCasefilter.length > 0) {
      const filteredAnecdotes = [...anecdotes].filter((q) => {
        return q.content.toLowerCase().includes(lowerCasefilter);
      });
      return filteredAnecdotes.sort((q1, q2) => {
        return q2.votes - q1.votes;
      });
    } else {
      return [...anecdotes].sort((q1, q2) => {
        return q2.votes - q1.votes;
      });
    }
  });
  const dispatch = useDispatch();

  const vote = (a) => {
    dispatch(increaseVote(a));
    console.log("vote", a);
    dispatch(setNotification(`Vote Added to: "${a.content}"`, 5));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
