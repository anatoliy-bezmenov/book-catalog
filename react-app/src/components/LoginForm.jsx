"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import { setDataToStorage, getToken } from "../services/authService";

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: null, password: null, credentials: null });
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (token) {
      navigate("/books");
    };
  }, [token, navigate]);

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors((prev) => ({
      ...prev,
      email: !loginForm.email ? "Email is required." : !emailRegex.test(loginForm.email) ? "Invalid email format." : null,
    }));
  };

  const validatePassword = () => {
    setErrors((prev) => ({
      ...prev,
      password: !loginForm.password ? "Password is required." : null,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginForm.email, loginForm.password);
      setDataToStorage(response);
      window.dispatchEvent(new Event("storage")); // Send signal so header can update its html
      navigate("/books");
    } catch (error) {
      setErrors((prev) => ({ ...prev, credentials: "The requested user could not be found." }));
    }
  };

  const isFormInvalid = !loginForm.email || !loginForm.password || errors.email || errors.password;

  return (
    <div>
      {errors.credentials && <p className="error">{errors.credentials}</p>}
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <div>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" value={loginForm.email} onChange={handleChange} onBlur={validateEmail} placeholder="Enter your email" />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" name="password" value={loginForm.password} onChange={handleChange} onBlur={validatePassword} placeholder="Enter your password" />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" disabled={isFormInvalid}>Login</button>
        <p>
          Don't have an account? <a href="/auth/register">Sign up</a> right now!
        </p>
      </form>
    </div>
  );
};

export default LoginForm;