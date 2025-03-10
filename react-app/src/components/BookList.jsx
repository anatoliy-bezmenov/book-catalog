import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import BookListComponent from "./BookListComponent";

const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            const sortedBooks = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setBooks(sortedBooks);
        } catch (error) {
            console.error("Error fetching books:", error);
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
                <>
                    <p>Loaded!</p>
                    <BookListComponent books={books} />
                </>
            )}
        </div>
    );
};

export default BookListPage;
