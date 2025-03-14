import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  return (
    <div className="container">
      <h1> Input Field</h1>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-box"
      />
      <p className="display-text">{text}</p>
    </div>
  );
}

export default App;

