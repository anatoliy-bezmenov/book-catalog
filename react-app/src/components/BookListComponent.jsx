import { Link } from "react-router-dom";

const BookListComponent = ({ books }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          <Link to={`/books/${book._id}/details`}>
            <img src={book.image} alt={book.name} width={175} height={250} />
          </Link>
          <Link>
            <p>{book.name}</p>
          </Link>
            <p>{book.year}</p>
        </li>
      ))}
    </ul>
  );
};

export default BookListComponent;