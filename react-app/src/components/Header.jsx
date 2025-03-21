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
  };

  return (
    <>
    <header className="w-full fixed top-0 left-0 bg-gradient-to-b from-[#6C5B7B] to-[#1C1C1E] text-white py-4 shadow-lg">
      <div className="flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">Book Hive</h1>
        <ul className="flex gap-8">
          <li>
            <Link to="/" className="text-lg hover:text-teal-300 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/books" className="text-lg hover:text-teal-300 transition duration-300">
              Books
            </Link>
          </li>
          <li>
            <Link to="/books/search" className="text-lg hover:text-teal-300 transition duration-300">
              Search
            </Link>
          </li>
          {!token ? (
            <>
              <li>
                <Link to="/auth/login" className="text-lg hover:text-teal-300 transition duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="text-lg hover:text-teal-300 transition duration-300">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/books/create" className="text-lg hover:text-teal-300 transition duration-300">
                  Add Book
                </Link>
              </li>
              <li>
                <Link to="/books" onClick={logout} className="text-lg hover:text-teal-300 transition duration-300 focus:outline-none">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
    <div className="mt-23"></div>
    </>
  );
};

export default Header;