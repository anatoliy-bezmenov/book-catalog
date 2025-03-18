import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookByIdNoUser, getBookById, deleteBookById } from "../services/bookService";
import { getToken } from "../services/authService";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const token = getToken();

  const fetchBook = async () => {
    if (token) {
      getBookById(id, token)
        .then((response) => {
          setBook(response);
          if (response.isOwner) {
            setIsOwner(true);
          };
        })
        .catch((error) => {
          navigate('/books');
        })
    };

    if (!token) {
      getBookByIdNoUser(id)
        .then((response) => {
          setBook(response);
        })
        .catch((error) => {
          navigate('/books');
        });
    };
  };

  const deleteBook = async () => {
    deleteBookById(id, token)
      .then(() => {
        navigate('/books');
      })
      .catch((error) => {
      })
  };

  const handleBack = () => {
    navigate("/books");
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  return (
    <div>
      <main className="mr-5">
        <div>
          <h2 className="text-[40px] mt-1">{book.name}</h2>
          <div className="flex items-center justify-center">
            <img
              src={book.image}
              alt="Book Image"
              width={300}
              height={450}
              className="mt-1 mb-6"
            />
          </div>

          <p className="ml-10 w-full min-w-[300px] max-w-[600px] mb-2 text-lg text-gray-300 leading-relaxed text-left">
            {book.description}
          </p>
          <div className="flex flex-col items-start ml-[32%] mb-4">
            <p className="book-details-p">
              <strong className="text-gray-200">Genre:</strong> {book.genre}
            </p>
            {book.year && (
              <>
            <p className="book-details-p">
              <strong className="text-gray-200">Year:</strong> {book.year}
            </p>
              </>
            )}
            {book.author && (
              <>
            <p className="book-details-p">
              <strong className="text-gray-200">Author:</strong> {book.author}
            </p>
              </>
            )}
          </div>

          <div className="flex justify-center gap-4 mb-6">
            {isOwner && (
              <>
                <Link to={`/books/${book._id}/edit`}>
                  <button className="edit-button">Edit Book</button>
                </Link>
                <button className="delete-button" onClick={deleteBook}>Delete Book</button>
              </>
            )}
            <button type="button" onClick={handleBack}>Back to Books</button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default BookDetails;