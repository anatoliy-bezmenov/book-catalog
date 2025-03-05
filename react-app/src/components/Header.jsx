import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { removeToken, getToken } from "../services/authService";

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(getToken());

  useEffect(() => {
    const checkToken = () => setToken(getToken());
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const logout = () => {
    removeToken();
    setToken(null);
    navigate("/books");
  };

  return (
    <>
      <h1>Book Hive Header</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        {!token ? (
          <>
          <li><Link to="/auth/login">Login</Link></li>
          <li><Link to="/auth/register">Register</Link></li>
          </>
        ) : (
          <li><button onClick={logout}>Logout</button></li>
        )}
      </ul>
    </>
  );
};

export default Header;
