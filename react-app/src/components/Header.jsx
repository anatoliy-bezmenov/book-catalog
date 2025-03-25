import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { token, logout } = useAuth();  // token and logout from AuthContext

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
                  <Link to="/" onClick={logout} className="text-lg hover:text-teal-300 transition duration-300 focus:outline-none">
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