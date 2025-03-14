import React, { useState } from "react";
import { useFormik } from "formik";
import "./App.css";
import Popup from "./Components/Popup.jsx";

const validate = (values) => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "*Required";
  } else if (values.firstname.length > 8) {
    errors.firstname = "*Must be 8 characters or less";
  }

  if (!values.lastname) {
    errors.lastname = "*Required";
  } else if (values.lastname.length > 8) {
    errors.lastname = "*Must be 8 characters or less";
  }

  if (!values.email) {
    errors.email = "*Required";
  } else if (!/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(values.email)) {
    errors.email = "*Invalid Email Address";
  }

  if (!values.password) {
    errors.password = "*Required";
  } else if (values.password.length > 8) {
    errors.password = "*Maximum 8 characters";
  } else if (values.password.length < 4) {
    errors.password = "*Minimum 4 characters";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "*Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "*Passwords must match";
  }

  return errors;
};

const App = () => {
  const [bool, setBool] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      setBool(true); 
    },
  });

  return (
    <div className="main">
      <div className="signup-form">
        <h2>Sign Up Here</h2>
        <form onSubmit={formik.handleSubmit}>
          <input type="text" placeholder="First Name" name="firstname" autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstname} />
          {formik.touched.firstname && formik.errors.firstname ? <span>{formik.errors.firstname}</span> : null}

          <input type="text" placeholder="Last Name" name="lastname" autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastname} />
          {formik.touched.lastname && formik.errors.lastname ? <span>{formik.errors.lastname}</span> : null}

          <input type="email" placeholder="E-mail" name="email" autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          {formik.touched.email && formik.errors.email ? <span>{formik.errors.email}</span> : null}

          <input type="password" placeholder="Password" name="password" autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          {formik.touched.password && formik.errors.password ? <span>{formik.errors.password}</span> : null}

          <input type="password" placeholder="Confirm Password" name="confirmPassword" autoComplete="off" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? <span>{formik.errors.confirmPassword}</span> : null}

          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="message-box">
        {bool && <Popup />}
      </div>
    </div>
  );
};

export default App;


