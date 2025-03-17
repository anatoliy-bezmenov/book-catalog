import { useEffect, useState } from "react";
import { getBooks, searchBook } from "../services/bookService";
import BookListComponent from "./BookListComponent";
import bookListImg from '/bookListImg.jpg';

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      const sortedBooks = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBooks(sortedBooks);
    } catch (error) {
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);
      const result = await searchBook(searchQuery);
      setBooks(result);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
    <div>
      <div className="image-div">
        <img
          src={bookListImg}
          className="object-cover w-full h-full"
        />
      </div>
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleSearch}
        className="max-w-[300px] px-4 py-2 border border-purple-500 bg-black text-white 
        placeholder-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 
        focus:border-teal-600 transition duration-200 mt-[80px] md:mt-4 -mb-2"
        />

      {isLoading ? (
        <>
        </>
      ) : books.length === 0 ? (
        <h1 className="mt-60">No books available</h1>
        ) : (
          <BookListComponent books={books} />
          )}
      </div>
    </>
  );
};

export default SearchBooks;