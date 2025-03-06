import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import { setDataToStorage, getToken } from "../services/authService";

const LoginForm = () => {
  const navigate = useNavigate();
  const token = getToken();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/books");
    }
  }, [token, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await login(data.email, data.password);
      setDataToStorage(response);
      window.dispatchEvent(new Event("storage"));
      navigate("/books");
    } catch (error) {
      setError("credentials", { type: "manual", message: "The requested user could not be found." });
    }
  };

  return (
    <div>
      {errors.credentials && <p className="error">{errors.credentials.message}</p>}
      <h2>Login</h2>
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

        <button type="submit" disabled={!isValid}>Login</button>
        <p>
          Don't have an account? <a href="/auth/register">Sign up</a> right now!
        </p>
      </form>
    </div>
  );
};

export default LoginForm;