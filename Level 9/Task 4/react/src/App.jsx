import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./App.css"; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={<PrivateRoute isAuthenticated={isAuthenticated}><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute isAuthenticated={isAuthenticated}><Profile /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

// Home Component 
const Home = () => (
  <div className="box">
    <h1>Welcome </h1>
    <Link to="/login" className="btn">Login</Link>
  </div>
);

// Login Component
const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard"); 
  };

  return (
    <div className="box">
      <h1>Login Page</h1>
      <button className="btn" onClick={handleLogin}>Login</button>
    </div>
  );
};

// Dashboard 
const Dashboard = () => (
  <div className="box">
    <h1>Dashboard</h1>
    <Link to="/profile" className="btn">Go to Profile</Link>
  </div>
);

// Profile
const Profile = () => (
  <div className="box">
    <h1>Profile Page</h1>
    <p>This is a protected profile page.</p>
  </div>
);


const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
