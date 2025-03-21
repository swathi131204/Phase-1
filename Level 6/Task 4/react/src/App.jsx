import React, { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState({ name: "", age: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2>Manage State with useState</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Enter name"
      />
      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={user.age}
        onChange={handleChange}
        placeholder="Enter age"
      />
      <div className="output">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
      </div>
    </div>
  );
}

export default App;

