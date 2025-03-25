import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { login as loginService } from "../services/userService";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { token, login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
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
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await loginService(data.email, data.password);
      login(response.token, response.email, response.name);
      navigate("/");
    } catch (error) {
      setError("credentials", { type: "manual", message: "The requested user could not be found." });
    }
  };

  return (
    <div className="auth-wrapper-div">
      <div className="w-full max-w-sm p-8 bg-[#121212] shadow-lg rounded-2xl border border-gray-800">
        <h2 className="text-3xl font-bold text-center text-purple-400">Login</h2>

        {errors.credentials && (
          <p className="error-message-invalid-credentials">{errors.credentials.message}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="auth-form-input"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
                onChange: () => clearErrors("credentials"),
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="auth-form-input"
              {...register("password", {
                required: "Password is required.",
                onChange: () => clearErrors("credentials"),
              })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-1/2 px-4 py-2 font-semibold text-white bg-purple-600 rounded-xl transition duration-200 hover:bg-purple-500 disabled:bg-gray-700"
          >
            Login
          </button>

          <p className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-purple-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;