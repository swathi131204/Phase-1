
import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: "", email: "" });

  const validate = () => {
    let valid = true;
    let newErrors = { name: "", email: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (validate()) {
      console.log("Form Data Submitted:", formData);
      alert("Form submitted successfully! ✅"); // Success popup
      setFormData({ name: "", email: "" }); // Reset form fields
    }
  };

  return (
    <div className="app-container">
      <h2>Form Submission</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
