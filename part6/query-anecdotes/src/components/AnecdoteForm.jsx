import { useNotificationDispatch } from "../NotificationContext";

// eslint-disable-next-line react/prop-types
const AnecdoteForm = ({ anecdoteMutation }) => {
  const dispatch = useNotificationDispatch();
  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    anecdoteMutation({ content, votes: 0 });
    dispatch({ type: "CREATE", payload: content });
    setTimeout(() => dispatch({ type: "CLEAR", payload: null }), 5000);
    console.log("new anecdote");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
