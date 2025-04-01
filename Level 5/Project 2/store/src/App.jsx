import React, { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Laptop",
    imageUrl: "/laptop.jpg",
    price: 85000,
  },
  {
    id: 2,
    name: "Smartphone",
    imageUrl: "/phone.jpg",
    price: 70000,
  },
  {
    id: 3,
    name: "Headphones",
    imageUrl: "/headphn.jpg",
    price: 2000,
  },
];

const Product = ({ product, addToCart }) => {
  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price.toLocaleString()}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

const Cart = ({ cart, removeFromCart }) => {
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-section">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <img src={item.imageUrl} alt={item.name} className="cart-img" />
                <div>
                  <p>{item.name}</p>
                  <p>₹{item.price.toLocaleString()}</p>
                </div>
                <button onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{totalPrice.toLocaleString()}</h3>
        </>
      )}
    </div>
  );
};


const App = () => {
  const [cart, setCart] = useState([]); 

  const addToCart = (product) => {
    setCart([...cart, product]); 
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <header>
        <h1>E-commerce Store</h1>
        <div className="cart-icon">
          🛒 <span className="cart-count">{cart.length}</span>
        </div>
      </header>

      <div className="product-list">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      <Cart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default App;
