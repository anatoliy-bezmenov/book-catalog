import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import BookListComponent from "./BookListComponent";
import GOT from '/GOT.jpg';

const BookListPage = () => {
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
                <>
                    <div className="auth-image-div">
                        <img
                            src={GOT}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </>
            ) : books.length === 0 ? (
                <h1 className="mt-60">No books available</h1>
            ) : (
                <>
                    <div className="auth-image-div">
                        <img
                            src={GOT}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <BookListComponent books={books} />
                </>
            )}
        </div>
    );
};

export default BookListPage;