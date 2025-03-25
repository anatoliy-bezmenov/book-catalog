import { useEffect, useState, useTransition } from "react";
import { getBooks, searchBook } from "../services/bookService";
import BookListComponent from "./BookListComponent";

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

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
      fetchBooks(); // Fetch all books if search query is empty
      return;
    }

    try {
      setIsLoading(true);
      const result = await searchBook(searchQuery);

      startTransition(() => {
        setBooks(result);
      });
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
          <div className="flex justify-center items-center mt-30">
            <div className="border-t-4 border-purple-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
          </div>
        ) : books.length === 0 ? (
          <h1 className="mt-60">No books available</h1>
        ) : (
          <BookListComponent books={books} />
        )}

        {isPending && <p className="text-gray-400 text-center mt-4">Updating results...</p>}
      </div>
    </>
  );
};

export default SearchBooks;