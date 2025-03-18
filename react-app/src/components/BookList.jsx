import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import BookListComponent from "./BookListComponent";
import bookListImg from '/bookListImg.jpg';

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
            <div>
                {isLoading ? (
                    <>
                        {/* <div className="image-div">
                            <img
                                src={bookListImg}
                                className="object-cover w-full h-full"
                            />
                        </div> */}
                    </>
                ) : !books ? (
                    <>
                    <h1 className="mt-60">No books available</h1>
                    {/* <div className="image-div">
                            <img
                                src={bookListImg}
                                className="object-cover w-full h-full"
                            />
                        </div> */}
                    </>
                    
                ) : (
                    <>
                        {/* <div className="image-div">
                            <img
                                src={bookListImg}
                                className="object-cover w-full h-full"
                            />
                        </div> */}
                        <BookListComponent books={books} />
                    </>
                )}
            </div>
        </div>
    );
};

export default BookListPage;