import { useState, useEffect } from "react";

function TimerComponent() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Logging message every second...");
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("Cleanup: Timer cleared");
    };
  }, []);

  return <div className="timer">Open to See Console...!</div>;
}

function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app">
      <h1>useEffect Cleanup Example</h1>
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? "Unmount Timer" : "Mount Timer"}
      </button>
      {showTimer && <TimerComponent />}
    </div>
  );
}

export default App;



