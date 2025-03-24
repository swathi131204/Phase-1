import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useSearchParams } from "react-router-dom";
import "./App.css";

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 65000 },
  { id: 2, name: "Headphones", category: "Electronics", price: 15000 },
  { id: 3, name: "Bag", category: "Fashion", price: 1000 },
  { id: 4, name: "Watch", category: "Fashion", price: 12000 },
  { id: 5, name: "Dress", category: "Fashion", price: 800 },
];

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [price, setPrice] = useState(searchParams.get("price") || "");

  useEffect(() => {
    const params = {};
    if (searchTerm) params.q = searchTerm;
    if (category) params.category = category;
    if (price) params.price = price;
    setSearchParams(params);
  }, [searchTerm, category, price, setSearchParams]);

  const filteredProducts = products.filter((product) => {
    return (
      (searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true) &&
      (category ? product.category === category : true) &&
      (price ? product.price <= parseInt(price) : true)
    );
  });

  return (
    <div className="container">
      <h2>Product Search</h2>
      <div className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
        </select>
        <input
          type="number"
          placeholder="Max Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <ProductList />
    </Router>
  );
};

export default App;
