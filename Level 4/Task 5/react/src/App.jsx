import React, { createContext, useState, useContext } from "react";
import "./App.css";

// Create Context
const MyContext = createContext();

// Provider Component
const MyProvider = ({ children }) => {
  const [state, setState] = useState("Hello, Context!");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <MyContext.Provider value={{ state, setState, darkMode, setDarkMode }}>
      <div className={darkMode ? "dark-theme" : "light-theme"}>{children}</div>
    </MyContext.Provider>
  );
};

// Consumer Component
const MyComponent = () => {
  const { state, setState, darkMode, setDarkMode } = useContext(MyContext);

  const toggleTheme = () => {
    setState("Updated State!");
    setDarkMode((prev) => !prev);
  };

  return (
    <div>
      <h2>{state}</h2>
      <button onClick={toggleTheme}>Update</button>
    </div>
  );
};

// App Component
const App = () => {
  return (
    <MyProvider>
      <MyComponent />
    </MyProvider>
  );
};

export default App;

