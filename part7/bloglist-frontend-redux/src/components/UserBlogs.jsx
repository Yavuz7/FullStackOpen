import { useParams } from "react-router-dom";

const UserBlogs = ({ users }) => {
  const currentId = useParams().id;
  let currentUser = users.find((userSearch) => userSearch.id === currentId);
  if (!currentUser) {
    return null;
  }
  return (
    <div>
      <h1>{currentUser.username}</h1>
      <h2>Their Blogs</h2>
      <ul>
        {currentUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default UserBlogs;
