import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createBook } from "../services/bookService";
import { getToken } from "../services/authService";

const CreateBook = () => {
  const navigate = useNavigate(); // useNavigate hook for redirection
  const token = getToken();
  const {
        register: registerField,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
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
    <>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="The Hobbit"
              {...registerField("name", {
                required: "Name is required.",
                minLength: { value: 2, message: "Name must be at least 2 characters long." },
                maxLength: { value: 30, message: "Cannot exceed 30 characters." },
              })}
            />
            {errors.name && <p style={{ color: "red" }} className="error">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="year">Year:</label>
            <input
              id="year"
              type="text"
              placeholder="1966"
              {...registerField("year", {
                required: "Year is required.",
                pattern: {
                  value: /^\d+$/,
                  message: "Year must be a natural number.",
                },
                validate: {
                  max: (value) => value <= 2025 || "Year cannot exceed 2025.",
                },
              })}
            />
            {errors.year && <p style={{ color: "red" }} className="error">{errors.year.message}</p>}
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="genre">Genre:</label>
            <input
              id="genre"
              type="text"
              placeholder="Fantasy"
              {...registerField("genre", {
                required: "Genre is required.",
                minLength: { value: 1, message: "Genre must be at least 1 character." },
                pattern: {
                  value: /^[a-zA-Z\s,]+$/,
                  message: "Genre can only contain letters, spaces, and commas.",
                },
              })}
            />
            {errors.genre && <p style={{ color: "red" }} className="error">{errors.genre.message}</p>}
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="author">Author:</label>
            <input
              id="author"
              type="text"
              placeholder="JR Tolkien"
              {...registerField("author", {
                required: "Author is required.",
                minLength: { value: 1, message: "Author must be at least 1 character." },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Author cannot contain numbers.",
                },
              })}
            />
            {errors.author && <p style={{ color: "red" }} className="error">{errors.author.message}</p>}
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input
              id="image"
              type="text"
              placeholder="https://m.media-amazon.com/images/I/71jD4jMityL._AC_UF1000,1000_QL80_.jpg"
              {...registerField("image", {
                required: "Image URL is required.",
                pattern: {
                  value: /^https?:.*\.(png|jpg)$/i,
                  message: "Image format must be .png or .jpg.",
                },
              })}
            />
            {errors.image && <p style={{ color: "red" }} className="error">{errors.image.message}</p>}
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="description">Description:</label>
          </div>
          <textarea
            id="description"
            placeholder="The Hobbit is set in Middle-earth and follows home-loving Bilbo Baggins, the hobbit of the title, who joins the wizard Gandalf and the thirteen dwarves of Thorin's Company, on a quest to reclaim the dwarves' home and treasure from the dragon Smaug."
            {...registerField("description", {
              required: "Description is required.",
              minLength: { value: 10, message: "Description must be at least 10 characters long." },
            })}
          />
          {errors.description && <p style={{ color: "red" }} className="error">{errors.description.message}</p>}
        </div>

        <div>
          <button type="submit" disabled={Object.keys(errors).length > 0}>Add Book</button>
          <button type="button" onClick={resetForm}>Reset Form</button>
          <button type="button" onClick={handleBack}>Back to Books</button>
        </div>
      </form>

      {errorMessage && <p style={{ color: "red" }} className="error">{errorMessage}</p>}
    </>
  );
};

export default CreateBook;
