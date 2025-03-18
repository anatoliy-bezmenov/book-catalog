import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createBook } from "../services/bookService";
import { getToken } from "../services/authService";

const CreateBook = () => {
  const navigate = useNavigate();
  const token = getToken();
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
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
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }
  }, [navigate, token]);

  const onSubmit = async (data) => {
    try {
      await createBook(data, token);
      navigate("/books");
    } catch (error) {
      setErrorMessage("Failed to create book. Please try again.");
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
      <h2 className="text-4xl font-bold text-center text-purple-400 mb-8">Add Book</h2>
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
              placeholder="1966"
              className="w-full p-3 mt-1 bg-gray-800 text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              {...registerField("year", {
                pattern: {
                  value: /^\d+$/,
                  message: "Year must be a natural number.",
                },
                validate: {
                  max: (value) => value <= 2025 || "Year cannot exceed 2025.",
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
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-500">Add Book</button>
          <button type="button" onClick={resetForm} className="w-full py-3 bg-gray-600 text-white rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500">Reset Form</button>
          <button type="button" onClick={handleBack} className="w-full py-3 bg-secondary text-white rounded-full hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-teal-500">Back to Books</button>
        </div>
      </form>

      {errorMessage && <p className="error-message-main">{errorMessage}</p>}
    </div>
  );
};

export default CreateBook;