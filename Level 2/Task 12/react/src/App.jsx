import React, { useState } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="container">
      <h1>{isLoggedIn ? "Welcome back!" : "Please log in"}</h1>
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Log out" : "Log in"}
      </button>
    </div>
  );
}

export default App;
