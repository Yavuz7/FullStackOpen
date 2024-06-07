import { Link } from "react-router-dom";
const User = ({ blogs, name, user }) => {
  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{name}</Link>
      </td>
      <td>{blogs.length > 0 ? blogs.length : 0}</td>
    </tr>
  );
};
export default User;
