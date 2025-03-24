import React, { useState, useEffect, memo } from "react";
import "./App.css";

const LargeList = memo(({ items }) => {
  console.log("Rendering LargeList");
  return (
    <div className="list-container">
      {items.map((item) => (
        <div key={item.id} className="list-item">
          {item.text}
        </div>
      ))}
    </div>
  );
});

const App = () => {
  const [count, setCount] = useState(0);
  const items = Array.from({ length: 1000 }, (_, i) => ({ id: i, text: `Item ${i + 1}` }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <h1>React.memo Optimization</h1>
      <p>Counter: {count}</p>
      <LargeList items={items} />
    </div>
  );
};

export default App;

