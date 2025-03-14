
import React from "react";
import "./App.css";

const items = ["Apple", "Banana", "Cherry", "Date", "Grapes"];

function App() {
  return (
    <div className="container">
      <h2>Fruit List</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="list-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
