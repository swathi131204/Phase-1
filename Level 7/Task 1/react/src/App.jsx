import React from "react";
import useToggle from "./useToggle";
import "./App.css";

const App = () => {
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <div className="app-container">
      <h1> useToggle </h1>
      <button className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? "Hide Content" : "Show Content"}
      </button>
      {isVisible && <p className="toggle-content">This is the toggled content!</p>}
    </div>
  );
};

export default App;
