import { useState } from "react";

const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

const App = () => {
  const [name, setName] = useState("Swathi"); // Default name

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Greeting name={name} />
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
        style={{ padding: "5px", marginTop: "10px" }}
      />
    </div>
  );
};

export default App;

