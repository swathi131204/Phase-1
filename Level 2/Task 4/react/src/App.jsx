import React, { useState } from "react";

const Greeting = ({ message = "Hello, World!" }) => {
  return <h1>{message}</h1>;
};

const App = () => {
  const [customMessage, setCustomMessage] = useState("");

  return (
    <div>
      <Greeting message={customMessage || undefined} />
      <input
        type="text"
        placeholder="Enter a custom greeting"
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
      />
    </div>
  );
};

export default App;

