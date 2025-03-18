import { Link } from "react-router-dom";
import errorImg from '/errorImg.jpg';

const ErrorPage = () => {
    return (
      <div>
        <div className="image-div">
        <img
          src={errorImg}
          className="object-cover w-full h-full"
        />
      </div>
    <div className="mt-40">
        <h1>Oops! Page Not Found</h1>
        <p className="text-[24px] mt-3">The page you're looking for doesn't exist.</p>
        <div className="flex justify-center gap-4 mt-30">
          <Link to='/'>
            <button>Go Home</button>
          </Link>
          <Link to='/books'>
            <button>Go to Books</button>
          </Link>
          <Link to='/books/search'>
            <button>Search Books</button>
          </Link>
        </div>
      </div>
    </div>
    );
  };
  
export default ErrorPage;