import React, { useState } from "react";
import "./App.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="container">
      <button className="toggle-btn" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide Content" : "Show Content"}
      </button>
      {isVisible && <div className="content-box">This is Swathi From SNS</div>}
    </div>
  );
}

export default App;

