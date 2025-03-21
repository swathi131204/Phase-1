import React, { createContext, useState, useContext } from "react";
import "./App.css";


const ThemeContext = createContext();


const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


const useTheme = () => useContext(ThemeContext);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

const AppContent = () => {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme}`}>
      <h1>   Theme Switcher - Dark Mode </h1>
      <ThemeToggle />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;


