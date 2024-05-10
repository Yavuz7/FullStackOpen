import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote } from "../requests";
const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ["anecdotes"] });
      queryClient.setQueryData(
        { queryKey: ["anecdotes"] },
        anecdotes.concat(newAnecdote)
      );
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
