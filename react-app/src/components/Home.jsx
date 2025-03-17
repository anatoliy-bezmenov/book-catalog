import home from '/home.jpg';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../services/authService";

const Home = () => {
  const user = getUser();
  const parsedUser = user ? JSON.parse(user) : null;

  useEffect(() => {
  }, []);

  return (
    <div>
      <div className="image-div">
        <img
          src={home}
          className="object-cover w-full h-full"
        />
      </div>
      {parsedUser && (
        <>
          <h1 className="text-3xl font-bold text-white-500 mt-6">
            Greetings, {parsedUser.name}
          </h1>
        </>
      )}

      <div>
        <p className="text-3xl font-bold text-white-500 mt-20">
          Welcome to Book Hive, the ultimate book catalog!
        </p>

        <div>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-4 p-6 text-white w-fit mx-auto mt-25">
            <li className="home-li">Browse our book catalog</li>
            <li className="home-li">View the details of any book</li>
            <li className="home-li">Search for books</li>
            <li className="home-li">Create, edit, and delete books</li>
          </ul>
        </div>

        <div className="flex justify-center gap-4 mt-30">
          <Link to='/books'>
            <button>Go to Books</button>
          </Link>
          <Link to='/books/search'>
            <button>Search Books</button>
          </Link>
          {!parsedUser && (
            <>
              <Link to='/auth/login'>
                <button>Sign In</button>
              </Link>
            </>
          )}
        </div>

      </div>

    </div>
  );
};

export default Home;