import { useState } from "react";
import "./App.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1 className="counter-text">Counter: {count}</h1>
      <div className="button-group">
        <button className="increment-button" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button className="decrement-button" onClick={() => setCount(count - 1)}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
