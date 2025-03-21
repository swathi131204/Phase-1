import React, { useState, useCallback } from "react";


const ChildComponent = React.memo(({ handleClick }) => {
  console.log("Child component re-rendered");
  return (
    <div>
      <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded">
        Click Me
      </button>
    </div>
  );
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // Memoizing the callback function using useCallback
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold">Parent Component</h2>
      <p>Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-green-500 text-white rounded mb-2"
      >
        Increment Count
      </button>
      <ChildComponent handleClick={handleClick} />
    </div>
  );
};

export default ParentComponent;

