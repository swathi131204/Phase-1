import React, { useState } from "react";
import "./App.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      setMessage("All fields are required!");
      return;
    }

    if (isLogin) {
      setMessage("Login Successful!");
    } else {
      setMessage("Signup Successful! Please log in.");
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="input-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className="input-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="submit-btn">{isLogin ? "Login" : "Signup"}</button>
      </form>

      <p className="toggle-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
