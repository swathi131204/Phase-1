import { useState } from "react";
import "./App.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="container">
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide Content" : "Show Content"}
      </button>
      {isVisible && <div className="content">Hello! This is me Swathi.</div>}
    </div>
  );
}

export default App;
