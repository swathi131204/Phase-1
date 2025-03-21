import React, { useState } from "react";
import useIntersectionObserver from "./useIntersectionObserver";
import "./App.css"; 

const InfiniteScroll = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => i + 1));

  const loadMore = () => {
    setTimeout(() => { 
      setItems((prevItems) => [...prevItems, ...Array.from({ length: 10 }, (_, i) => prevItems.length + i + 1)]);
    }, 500);
  };

  const observerRef = useIntersectionObserver(loadMore, { threshold: 1.0 });

  return (
    <div style={{ padding: "20px" }}>
      {items.map((item) => (
        <div key={item} className="item">
          Item {item}
        </div>
      ))}
      <div ref={observerRef} className="loading-indicator">Loading...</div>
    </div>
  );
};

export default InfiniteScroll;
