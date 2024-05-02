import { useDispatch } from "react-redux";
import { newQuote } from "../reducers/anecdoteReducer";
import { setNotif, clearNotif } from "../reducers/notificationsReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addQuote = async (event) => {
    event.preventDefault();
    const content = event.target.quote.value;
    event.target.quote.value = "";
    dispatch(newQuote(content));
    dispatch(setNotif(`New Quote: "${content}" Added!`));
    setTimeout(() => dispatch(clearNotif()), 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addQuote}>
        <div>
          <input name="quote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
