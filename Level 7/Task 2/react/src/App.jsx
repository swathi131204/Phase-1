import React from "react";
import useCounter from "./useCounter";
import "./App.css";

const App = () => {
    const { count, increment, decrement, reset } = useCounter(0);

    return (
        <div className="counter-container">
            <h1>Counter: {count}</h1>
            <div className="button-group">
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
};

export default App;

