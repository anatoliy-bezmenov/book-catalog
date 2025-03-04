"use client";
import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    const fetchBooks = async () => {
      try {
          const response = await getBooks();
          // const sortedBooks = response.books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          // setBooks(sortedBooks);
          setBooks(response);
          console.log(response);
      } catch (error) {
          console.log("Failed to fetch books:", error);
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
                      <img src={book.image} alt={book.name} width={175} height={250} />
                  <p>{book.name}</p>
                  <p>{book.year}</p>
                </li>
              ))}
          </>
        )}
      </div>
    );
};

export default BookList;