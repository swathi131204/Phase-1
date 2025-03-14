import React, { useState } from "react";
import "./App.css";

const Person = ({ name, age, city }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
};

function App() {
  const [person, setPerson] = useState({
    name: "Swathi",
    age: 21,
    city: "Coimbatore",
  });

  const updatePerson = () => {
    setPerson({
      name: "Harish",
      age: 25,
      city: "Chennai",
    });
  };

  return (
    <div className="container">
      <h1>Details</h1>
      <Person name={person.name} age={person.age} city={person.city} />
      <button onClick={updatePerson}>Update Person</button>
    </div>
  );
}

export default App;

