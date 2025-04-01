import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [prevInput, setPrevInput] = useState("");
  const [operator, setOperator] = useState("");
  const [expression, setExpression] = useState("");

  const handleNumberClick = (num) => {
    setInput((prev) => prev + num);
  };

  const handleOperatorClick = (op) => {
    if (input === "") return;
    setPrevInput(input);
    setOperator(op);
    setExpression(input + " " + op); 
    setInput("");
  };

  const calculateResult = () => {
    if (!prevInput || !input || !operator) return;

    const num1 = parseFloat(prevInput);
    const num2 = parseFloat(input);
    let result;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num2 !== 0 ? num1 / num2 : "Error";
        break;
      default:
        return;
    }

    setExpression(prevInput + " " + operator + " " + input + " = " + result); // Show full equation
    setInput(result.toString());
    setPrevInput("");
    setOperator("");
  };

  const handleClear = () => {
    setInput("");
    setPrevInput("");
    setOperator("");
    setExpression(""); 
  };

  return (
    <div className="calculator">
      <div className="display">{expression || input || "0"}</div>

      <div className="buttons">
      
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button key={num} onClick={() => handleNumberClick(num.toString())}>
            {num}
          </button>
        ))}

        {["+", "-", "*", "/"].map((op) => (
          <button key={op} className="operator" onClick={() => handleOperatorClick(op)}>
            {op}
          </button>
        ))}

        
        <button onClick={calculateResult} className="equals">=</button>
        <button onClick={handleClear} className="clear">C</button>
      </div>
    </div>
  );
};

export default App;
