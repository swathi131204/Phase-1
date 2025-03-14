import React from "react";
import PropTypes from "prop-types";
import "./App.css";

const Greeting = ({ name, age }) => {
  return (
    <div className="greeting">
      <h2>Hello, {name}</h2>
      <p>Age: {age}</p>
    </div>
  );
};

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
};

const App = () => {
  return (
    <div className="app">
      <h1> Validation </h1>
      <Greeting name="Swathi" age={21} />
     
      <Greeting name={131204} age="twenty one" />
    </div>
  );
};

export default App;

