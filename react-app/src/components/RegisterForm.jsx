import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../services/userService";
import { setDataToStorage, getToken } from "../services/authService";

const RegisterForm = () => {
  const navigate = useNavigate();
  const token = getToken();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      rePassword: "",
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/books");
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    if (data.password !== data.rePassword) {
      setError("rePassword", { type: "manual", message: "Passwords must match." });
      return;
    }

    try {
      const response = await registerUser(data.email, data.name, data.password, data.rePassword);
      setDataToStorage(response);
      window.dispatchEvent(new Event("storage"));
      navigate("/books");
    } catch (error) {
      setError("credentials", { type: "manual", message: "Invalid email address." });
    }
  };

  return (
    <div>
      {errors.credentials && <p className="error">{errors.credentials.message}</p>}
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format.",
              },
              onChange: () => clearErrors("credentials"),
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required.",
              minLength: {
                value: 5,
                message: "Name must be at least 5 characters long.",
              },
              onChange: () => clearErrors("credentials"),
            })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required.",
              onChange: () => clearErrors("credentials"),
            })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="rePassword">Repeat Password:</label>
          <input
            id="rePassword"
            type="password"
            placeholder="Repeat your password"
            {...register("rePassword", {
              required: "Please confirm your password.",
              validate: (value) => value === watch("password") || "Passwords must match.",
              onChange: () => clearErrors("credentials"),
            })}
          />
          {errors.rePassword && <p className="error">{errors.rePassword.message}</p>}
        </div>

        <button type="submit" disabled={!isValid}>Register</button>
        <p>
          Already have an account? <a href="/auth/login">Login</a> right now!
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;