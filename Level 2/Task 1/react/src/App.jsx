
import React, { useState } from "react";

const Greeting = () => {
  const [message, setMessage] = useState("Hello from a functional component!");

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => setMessage("You clicked the button!")}>Click Me</button>
    </div>
  );
};

export default Greeting;

