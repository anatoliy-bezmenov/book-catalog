import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { saveBookById, getBookById } from "../services/bookService";
import { useAuth } from "../context/AuthContext";
// import { getToken } from "../services/authService";

const EditBook = () => {
  const navigate = useNavigate(); // hook for redirection
  const { id } = useParams();
  const { token } = useAuth();
  // const token = getToken();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const {
    register: registerField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      year: "",
      genre: "",
      author: "",
      description: "",
      image: "",
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }
    fetchBook();
  }, [navigate, token]);

  const fetchBook = async () => {
    try {
      const response = await getBookById(id, token);
      if (!response.isOwner) {
        navigate("/books");
        return;
      }
      setIsOwner(true);
      reset({
        name: response.name || "",
        year: response.year < 0 ? `${Math.abs(response.year)} BC` : response.year || "",
        genre: response.genre || "",
        author: response.author || "",
        description: response.description || "",
        image: response.image || "",
      });
    } catch (error) {
      navigate("/books");
    }
  };

  const onSubmit = async (data) => {
    try {
      if (typeof data.year === "string") {
        const bcMatch = data.year.match(/^(\d{1,4})\s?(B\.?C)$/i);
        if (bcMatch) {
          data.year = -parseInt(bcMatch[1], 10); // Convert BC to negative number
        } else {
          data.year = parseInt(data.year, 10) || ""; // Convert normal years to numbers
        }
      }

      await saveBookById(id, data, token);
      navigate("/books");
    } catch (error) {
      setErrorMessage("Failed to save book. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/books");
  };

  const resetForm = () => {
    reset();
  };

  return (
    <div className="bg-[#121212] text-white p-6 rounded-lg min-w-4xl mx-auto shadow-xl mt-6">
      <h2 className="text-4xl font-bold text-center text-purple-400 mb-8">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-lg font-medium">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="The Hobbit"
              className="w-full p-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              {...registerField("name", {
                required: "Name is required.",
                minLength: { value: 2, message: "Name must be at least 2 characters long." },
                maxLength: { value: 50, message: "Cannot exceed 50 characters." },
              })}
            />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="genre" className="block text-lg font-medium">Genre:</label>
            <input
              id="genre"
              type="text"
              placeholder="Fantasy"
              className="w-full p-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              {...registerField("genre", {
                required: "Genre is required.",
                minLength: { value: 1, message: "Genre must be at least 1 character." },
                pattern: {
                  value: /^[a-zA-Z\s,]+$/,
                  message: "Genre can only contain letters, spaces, and commas.",
                },
              })}
            />
            {errors.genre && <p className="error-message">{errors.genre.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="year" className="block text-lg font-medium">Year (optional):</label>
            <input
              id="year"
              type="text"
              placeholder="1966 or 67 BC"
              className="w-full p-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              {...registerField("year", {
                validate: (value) => {
                  if (!value || value) { // gotta add || value -> otherwise it won't save
                    // unless the user clicks the input field
                    return true
                  };
                  const bcMatch = value.match(/^(\d{1,4})\s?(B\.?C)$/i);
                  if (bcMatch) {
                    return true
                  };
                  const year = parseInt(value, 10);
                  if (!isNaN(year) && year <= 2025) {
                    return true
                  };

                  return "Enter a valid year (max 2025 AD, min 5000 BC).";
                },
              })}
            />
            {errors.year && <p className="error-message">{errors.year.message}</p>}
          </div>

          <div>
            <label htmlFor="author" className="block text-lg font-medium">Author (optional):</label>
            <input
              id="author"
              type="text"
              placeholder="JR Tolkien"
              className="w-full p-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              {...registerField("author", {
                minLength: { value: 1, message: "Author must be at least 1 character." },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Author cannot contain numbers.",
                },
              })}
            />
            {errors.author && <p className="error-message">{errors.author.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="image" className="block text-lg font-medium">Image URL:</label>
          <input
            id="image"
            type="text"
            placeholder="https://m.media-amazon.com/images/I/71jD4jMityL._AC_UF1000,1000_QL80_.jpg"
            className="w-full p-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            {...registerField("image", {
              required: "Image URL is required.",
              pattern: {
                value: /^https?:.*\.(png|jpg)$/i,
                message: "Image format must be .png or .jpg.",
              },
            })}
          />
          {errors.image && <p className="error-message">{errors.image.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium">Description:</label>
          <textarea
            id="description"
            type="textarea"
            placeholder="The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins..."
            rows="5"
            className="w-full p-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            {...registerField("description", {
              required: "Description is required.",
              minLength: { value: 10, message: "Description must be at least 10 characters long." },
            })}
          />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="save-button">Save Book</button>
          <button type="button" onClick={resetForm} className="w-full py-3 bg-gray-600 text-white rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500">Reset Form</button>
          <button type="button" onClick={handleBack} className="w-full py-3 bg-secondary text-white rounded-full hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-teal-500">Back to Books</button>
        </div>
      </form>

      {errorMessage && <p className="error-message-main">{errorMessage}</p>}
    </div>
  );
};

export default EditBook;