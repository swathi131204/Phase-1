import React from 'react';
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

