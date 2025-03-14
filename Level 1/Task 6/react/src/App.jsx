import React, { useState } from "react";
import "./App.css";

const ColorBox = ({ bgColor }) => {
  return (
    <div className="color-box" style={{ backgroundColor: bgColor }}>
      {bgColor}
    </div>
  );
};

function App() {
  const [color, setColor] = useState("black");

  return (
    <div className="container">
      <ColorBox bgColor={color} />
      <button onClick={() => setColor("red")}>Red</button>
      <button onClick={() => setColor("green")}>Green</button>
      <button onClick={() => setColor("pink")}>Pink</button>
    </div>
  );
}

export default App;
