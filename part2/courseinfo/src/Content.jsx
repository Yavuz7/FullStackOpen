import Part from "./Part";
import SumOfExercises from "./SumOfExercises";
const Content = ({ content }) => {
  console.log(content);
  const total = content.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);
  return (
    <>
      {content.map((part) => (
        <Part key={part.id} content={part.name} exercises={part.exercises} />
      ))}

      <SumOfExercises total={total} />
    </>
  );
};

export default Content;
