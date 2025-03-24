import React, { Suspense, lazy, useState, useEffect, useMemo, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { memo } from "react";
import { FixedSizeList } from "react-window";
import "./App.css"

// Lazy loading routes
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const LargeComponent = lazy(() => import("./LargeComponent"));

// Memoized component to prevent unnecessary renders
const Header = memo(() => {
  return (
    <header>
      <h1>Optimized App</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
    </header>
  );
});

// Simulating an API call with caching
const fetchData = async () => {
  const cachedData = sessionStorage.getItem("data");
  if (cachedData) return JSON.parse(cachedData);
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  sessionStorage.setItem("data", JSON.stringify(data));
  return data;
};

const List = memo(({ items }) => {
  return (
    <FixedSizeList
      height={400}
      width={600}
      itemSize={50}
      itemCount={items.length}
    >
      {({ index, style }) => (
        <div style={style}>{items[index].title}</div>
      )}
    </FixedSizeList>
  );
});

function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  // useMemo to avoid recalculating expensive operations
  const filteredData = useMemo(() => data.slice(0, 50), [data]);

  // useCallback to prevent function recreation on every render
  const increment = useCallback(() => setCount((prev) => prev + 1), []);

  return (
    <Router>
      <Header />
      <button onClick={increment}>Increment: {count}</button>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/large" element={<LargeComponent />} />
        </Routes>
      </Suspense>
      <h2>Large List with Windowing</h2>
      <List items={filteredData} />
    </Router>
  );
}

export default App;
