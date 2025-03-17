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
        <h1>Oops! Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    );
  };
  
export default ErrorPage;