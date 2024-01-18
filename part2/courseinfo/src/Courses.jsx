import Content from "./Content";

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <h1>{course.name}</h1>
          <Content content={course.parts} />
        </div>
      ))}
    </div>
  );
};

export default Courses;
