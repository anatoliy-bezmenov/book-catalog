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
      <main>
        <div>
          <h1>{book.name}</h1>
          <img
            src={book.image}
            alt="Book Image"
            width={300}
            height={450}
            />
          <p>{book.description}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Year:</strong> {book.year}</p>
          <p><strong>Author:</strong> {book.author}</p>


          {isOwner && (
            <span>
            <Link to={`/books/${book._id}/edit`}>
                <button>Edit Book</button>
            </Link>
            <button onClick={deleteBook}>Delete Book</button>
            </span>
          )}
          <button type="button" onClick={handleBack}>Back to Books</button>
        </div>
      </main>
    </div>
  );
};

export default BookDetails;