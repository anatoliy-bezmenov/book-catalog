import { Link } from "react-router-dom";

const BookListComponent = ({ books }) => {
  return (
    <>
    <ul className="border-0 p-4 rounded-lg text-left grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-10 list-none mx-5 mr-[0px] mt-5 mb-[-15px]">
      {books.map((book) => (
        <li key={book._id}>
          <Link to={`/books/${book._id}/details`}>
            <img src={book.image} alt={book.name} width={175} height={250} />
          </Link>
          <Link to={`/books/${book._id}/details`}>
            <p className="hover:text-yellow-500 transition duration-300 mt-2">{book.name}</p>
          </Link>
            <p>{book.genre}</p>
        </li>
      ))}
    </ul>
    </>
  );
};

export default BookListComponent;