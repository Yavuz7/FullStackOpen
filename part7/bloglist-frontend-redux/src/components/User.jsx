const User = ({ blogs, name }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{blogs.length > 0 ? blogs.length : 0}</td>
    </tr>
  );
};
export default User;
