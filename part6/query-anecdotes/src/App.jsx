import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useNotificationDispatch } from "./NotificationContext.jsx";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests";
const App = () => {
  const dispatch = useNotificationDispatch();

  const updateVoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch({ type: "VOTE", payload: anecdote.content });
    setTimeout(() => dispatch({ type: "CLEAR", payload: null }), 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
    onError: () => {
      console.log("here");
    },
  });
  console.log(JSON.parse(JSON.stringify(result)));

  const anecdotes = result.data;

  if (result.isLoading) {
    return <div>loading data...</div>;
  } else if (result.isError) {
    return <div>Error: Can not reach server. Oof</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm anecdoteMutation={newAnecdoteMutation.mutate} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
