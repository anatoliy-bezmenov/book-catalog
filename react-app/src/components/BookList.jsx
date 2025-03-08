import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import { Link } from "react-router-dom";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const fetchBooks = async () => {
      try {
          const response = await getBooks();
          const sortedBooks = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setBooks(sortedBooks);
      } catch (error) {
      }
  };
  
    useEffect(() => {
      fetchBooks();
      const timer = setTimeout(() => setIsLoading(false), 750);
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>Loaded!</p>
        )}
  
        {!isLoading && (
          <>
              {books.map((book) => (
                <li key={book._id}>          
                  {/* <img src={book.image} alt={book.name} width={175} height={250} />
                  <p>{book.name}</p>
                  <p>{book.year}</p> */}
                  <Link to={`/books/${book._id}/details`}>
                    <img src={book.image} alt={book.name} width={175} height={250} />
                    <p>{book.name}</p>
                    <p>{book.year}</p>
                  </Link>
                </li>
              ))}
          </>
        )}
      </div>
    );
};

export default BookList;