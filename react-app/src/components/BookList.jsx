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
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <div>
                {isLoading ? (
                    <>
                    <div className="flex justify-center items-center mt-30">
                        <div className="border-t-4 border-purple-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
                    </div>
                    </>
                ) : books.length === 0 ? (
                    <>
                    <h1 className="mt-60">No books available</h1>
                    </>
                ) : (
                    <>
                        <BookListComponent books={books} />
                    </>
                )}
            </div>
        </div>
    );
};

export default BookListPage;