import { useEffect } from "react";
import { grabAllUsers } from "../reducers/alluserReducer";
import { useDispatch, useSelector } from "react-redux";

import User from "./User";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);
  console.log(users);
  useEffect(() => {
    dispatch(grabAllUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h2>All Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
          {users.map((user) => (
            <User
              key={user.id}
              blogs={user.blogs}
              name={user.name}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
