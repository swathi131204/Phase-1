import React from "react";
import { FixedSizeList as List } from "react-window";
import "./App.css";

// Generate 10,000 items
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

const Row = ({ index, style }) => (
  <div className="list-item" style={style}>
    {items[index]}
  </div>
);

function App() {
  return (
    <div className="app-container">
      <h1>Virtual Scrolling List</h1>
      <List
        height={500} // Visible height
        itemCount={items.length} // Total items
        itemSize={50} // Height of each item
        width={"100%"} // Full width
      >
        {Row}
      </List>
    </div>
  );
}

export default App;

