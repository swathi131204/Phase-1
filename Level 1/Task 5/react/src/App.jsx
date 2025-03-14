import React from "react";

const App = () => {

  const num1 = 46;
  const num2 = 8;
  const result = num1 + num2; 

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React JS Calculation</h1>
      <p>The result of {num1} + {num2} is: <strong>{result}</strong></p>
    </div>
  );
};

export default App;
