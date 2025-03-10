// SearchBooks.js
import { useEffect, useState } from "react";
import { getBooks, searchBook } from "../services/bookService";
import BookListComponent from "./BookListComponent";  // Import the common BookList component

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      const sortedBooks = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBooks(sortedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
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
      {/* Use the BookList component to render the filtered books */}
      <BookListComponent books={books} />
    </>
  );
};

export default SearchBooks;






// import { useEffect, useState } from "react";
// import { getBooks, searchBook } from "../services/bookService";
// import { Link } from "react-router-dom";

// const SearchBooks = () => {
//     const [books, setBooks] = useState([]);
//     const [query, setQuery] = useState("");

//     const fetchBooks = async () => {
//         try {
//             const response = await getBooks();
//             const sortedBooks = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//             setBooks(sortedBooks);
//         } catch (error) {
//         }
//     };

//     const handleSearch = async (e) => {
//         const searchQuery = e.target.value;
//         setQuery(searchQuery);

//         if (searchQuery.trim() === "") {
//             fetchBooks(); // get all books if search is empty
//             return;
//         }

//         try {
//             const result = await searchBook(searchQuery);
//             setBooks(result);
//         } catch (error) {
            
//         }
//     };

//     useEffect(() => {
//         fetchBooks();
//     }, []);

//     return (
//         <>
//             <input 
//                 type="text" 
//                 placeholder="Search books..." 
//                 value={query} 
//                 onChange={handleSearch} 
//                 style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
//             />
//             <ul>
//                 {books.map((book) => (
//                     <li key={book._id}>
//                         <Link to={`/books/${book._id}/details`}>
//                             <img src={book.image} alt={book.name} width={175} height={250} />
//                             <p>{book.name}</p>
//                             <p>{book.year}</p>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </>
//     );
// };

// export default SearchBooks;