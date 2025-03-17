import { useEffect, useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name.firstname} {user.name.lastname} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
