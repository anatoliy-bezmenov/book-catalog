"use client";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBookByIdNoUser, getBookById, deleteBookById, saveBookById } from "../services/bookService";
import { getToken, getUser } from "../services/authService";

// TODO: navigate to error page when URL (to a non existent one) of movie is manually changed
// Right now it changes it as if the movie exists (but it does not) and displays the 
// static HTML of this page but not the dynamic one (since it's an empty string basically)

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const token = getToken();
  const user = getUser();

  const fetchBook = async () => {
    if (token) {
      getBookById(id, token)
        .then((response) => {
          setBook(response);
          console.log("with user ", response)
          let parsedUser = JSON.parse(user);
          if (response.owner.email == parsedUser.email) {
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
          console.log("without user ", response)
        })
        .catch((error) => {
          navigate('/books');
        });
    };
  };

    const deleteBook = async () => {
      deleteBookById(id, token)
        .then(() => {
          router.push('/books');
        })
        .catch((error) => {
        })
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
            <button onClick={deleteBook}>Delete Book</button>
            <Link to={`/books/${book._id}/edit`}>  {/* Currently page doesn't exist */}
                <button>Edit Book</button>
            </Link>
            </span>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookDetails;



// "use client"
// import { useNavigate, useParams, useRouter } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { getBookByIdNoUser, getBookById, deleteBookById } from '../services/bookService';

// const BookDetails = () => {
//     const router = useRouter();
//     let [book, setBook] = useState({});
//     const [isOwner, setIsOwner] = useState(false);
//     const params = useParams();
//     const id = params.id;
//     const token = getToken();
//     let user = getUser()
  
//     const fetchBook = async () => {
//       if (token) {
//         getBookById(id, token)
//           .then((response) => {
//             setBook(response);
//             let parsedUser = JSON.parse(user);
//             if (response.owner.email == parsedUser.email) {
//               setIsOwner(true);
//             };
//           })
//           .catch((error) => {
//             router.push('/books');
//           })
//       };
  
//       if (!token) {
//         getBookByIdNoUser(id)
//           .then((response) => {
//             setBook(response);
//           })
//           .catch((error) => {
//             router.push('/books');
//           });
//       };
//     };
  
//     const deleteBook = async () => {
//       deleteBookById(id, token)
//         .then(() => {
//           router.push('/books');
//         })
//         .catch((error) => {
//         })
//     };
  
//     useEffect(() => {
//       fetchBook();
//     }, []);
  
//     return (
//         <div>
//           <main>
//             <div>
//                 <h1>{book.name}</h1>
//                   <p>
//                     {book.year}
//                     <span>{book.imdbRating}</span>
//                   </p>
  
//                 <img
//                   className={styles.movieImage}
//                   src={book.image}
//                   alt="image"
//                   width={300}
//                   height={450}
//                   priority="true"
//                 />
//                   {book.description}
//                   <p><strong>Genre:</strong> {book.genre}</p>
//                   <p><strong>Country:</strong> {book.country}</p>
//                   <p><strong>Director:</strong> {book.director}</p>
//             </div>
  
//           </main>
//         </div>
//     );
//   }
  
//   export default BookDetails;