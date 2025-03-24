import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, Navigate } from "react-router-dom";
import "./App.css";

const products = [
  { id: "1", name: "Laptop", price: "$65,000", description: "High-performance laptop." },
  { id: "2", name: "Phone", price: "$30,000", description: "Latest smartphone with great features." },
  { id: "3", name: "Headphones", price: "$1,500", description: "Noise-canceling headphones." },
];

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Home</Link> | <Link to="/products">Products</Link>
  </nav>
);

const Home = () => (
  <div className="container">
    <h2>Welcome to Our Store</h2>
    <p>Browse our latest products.</p>
    <Link to="/products">View Products</Link>
  </div>
);

const ProductList = () => (
  <div className="container">
    <h2>Product List</h2>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h2 className="container">Product not found</h2>;
  }

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>
      <p>{product.description}</p>
      <Link to="/products">Back to Product List</Link>
    </div>
  );
};

const NotFound = () => (
  <div className="container">
    <h2>404 - Page Not Found</h2>
    <Link to="/">Go to Home</Link>
  </div>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
