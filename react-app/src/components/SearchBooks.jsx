import { useEffect, useState } from "react";
import { getBooks, searchBook } from "../services/bookService";
import BookListComponent from "./BookListComponent";

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      const sortedBooks = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBooks(sortedBooks);
    } catch (error) {
    }
  };

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      fetchBooks(); // Get all books if search query is empty
      return;
    }

    try {
      const result = await searchBook(searchQuery);
      setBooks(result);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <input 
        type="text" 
        placeholder="Search books..." 
        value={query} 
        onChange={handleSearch} 
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />
      <BookListComponent books={books} />
    </>
  );
};

export default SearchBooks;