import React, { useState } from "react";

const App = () => {
  // State to manage user role (Change role to "User" to see different content)
  const [userRole, setUserRole] = useState("Admin");

  return (
    <div>
      <h1>Welcome to the App</h1>
      {userRole === "Admin" ? (
        <p>🔹 Hello, Admin! </p>
      ) : (
        <p>🔸 Hello, User! </p>
      )}

    
      <button onClick={() => setUserRole(userRole === "Admin" ? "User" : "Admin")}>
        Switch to {userRole === "Admin" ? "User" : "Admin"}
      </button>
    </div>
  );
};

export default App;

