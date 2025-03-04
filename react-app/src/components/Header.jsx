import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <h1>Book Hive Header</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
      </ul>
    </>
  );
};

export default Header;