import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>Simple Counter</h1>
      <p className="count">{count}</p>
      <div className="buttons">
        <button onClick={() => setCount(count - 1)} className="btn decrement">
          Decrement
        </button>
        <button onClick={() => setCount(count + 1)} className="btn increment">
          Increment
        </button>
      </div>
    </div>
  );
}

export default App;

