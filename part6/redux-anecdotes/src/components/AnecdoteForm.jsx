import { useDispatch } from "react-redux";
import { newQuote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addQuote = (event) => {
    event.preventDefault();
    const content = event.target.quote.value;
    event.target.quote.value = "";
    dispatch(newQuote(content));
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