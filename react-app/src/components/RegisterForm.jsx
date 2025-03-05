"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/userService";
import { setDataToStorage, getToken } from "../services/authService";

const RegisterForm = () => {
  const [registerForm, setRegisterForm] = useState({ email: "", name: "", password: "",
  rePassword: "" });
  const [errors, setErrors] = useState({ email: null, name: null,
  password: null, rePassword: null, credentials: null });
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (token) {
      navigate("/books");
    };
  }, [token, navigate]);

  const handleChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors((prev) => ({
      ...prev,
      email: !registerForm.email ? "Email is required." : !emailRegex.test(registerForm.email) ? "Invalid email format." : null,
    }));
  };

  const validateName = () => {
    if (!registerForm.name) {
      setErrors((prev) => ({ ...prev, name: "Name is required." }));
    } else if (registerForm.name.length < 5) {
      setErrors((prev) => ({ ...prev, name: "Name must be at least 5 characters long." }));
    } else {
      setErrors((prev) => ({ ...prev, name: null }));
    }
  };

  const validatePassword = () => {
    setErrors((prev) => ({
      ...prev,
      password: !registerForm.password ? "Password is required." : null,
    }));
  };

  const validateRePassword = () => {
    if (registerForm.rePassword !== registerForm.password) {
      setErrors((prev) => ({
        ...prev,
        rePassword: "Passwords must match."
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        rePassword: null
      }));
    }
  };  

  const registerUser = async (e) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.rePassword) {
      setErrors((prev) => ({
        ...prev,
        rePassword: "Passwords must match.",
      }));
      return; // Don't proceed with registration if passwords don't match
    }
  
    try {
      const response = await register(registerForm.email, registerForm.name, registerForm.password,
      registerForm.rePassword);
      setDataToStorage(response);
      window.dispatchEvent(new Event("storage")); // Send signal so header can update its html
      navigate("/books");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        credentials: "Invalid email address.",
      }));
    }
  };
  

  const isFormInvalid = !registerForm.email || !registerForm.name || !registerForm.password
  || !registerForm.rePassword || errors.email || errors.name || errors.password
  || errors.rePassword;

  return (
    <div>
      {errors.credentials && <p className="error">{errors.credentials}</p>}
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" value={registerForm.email} onChange={handleChange} onBlur={validateEmail} placeholder="Enter your email" />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" name="name" value={registerForm.name} onChange={handleChange} onBlur={validateName} placeholder="Enter your name" />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" name="password" value={registerForm.password} onChange={handleChange} onBlur={validatePassword} placeholder="Enter your password" />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label htmlFor="rePassword">Repeat Password:</label>
          <input id="rePassword" type="password" name="rePassword" value={registerForm.rePassword} onChange={handleChange} onBlur={validateRePassword} placeholder="Repeat your password" />
          {errors.password && <p className="error">{errors.rePassword}</p>}
        </div>
        <button type="submit" disabled={isFormInvalid}>Register</button>
        <p>
          Already have an account? <a href="/auth/login">Login</a> right now!
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;