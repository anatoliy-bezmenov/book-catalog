import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { register as registerUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { token, login } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
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
  }, [navigate]);

  const onSubmit = async (data) => {
    if (data.password !== data.rePassword) {
      setError("rePassword", { type: "manual", message: "Passwords must match." });
      return;
    }

    try {
      const response = await registerUser(data.email, data.name, data.password, data.rePassword);
      login(response.token, response.email, response.name);
      navigate("/");
    } catch (error) {
      setError("credentials", { type: "manual", message: "Invalid email address." });
    }
  };

  return (
    <div className="auth-wrapper-div">
      <div className="w-full max-w-sm p-8 bg-[#121212] shadow-lg rounded-2xl border border-gray-800">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-5">Register</h2>
        {errors.credentials && <p className="text-red-500 text-sm text-center">{errors.credentials.message}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">Email:</label>
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm text-gray-300">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="auth-form-input"
              {...register("name", {
                required: "Name is required.",
                minLength: {
                  value: 5,
                  message: "Name must be at least 5 characters long.",
                },
                onChange: () => clearErrors("credentials"),
              })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300">Password:</label>
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="rePassword" className="block text-sm text-gray-300">Repeat Password:</label>
            <input
              id="rePassword"
              type="password"
              placeholder="Repeat your password"
              className="auth-form-input"
              {...register("rePassword", {
                required: "Please confirm your password.",
                validate: (value) => value === watch("password") || "Passwords must match.",
                onChange: () => clearErrors("credentials"),
              })}
            />
            {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-1/2 p-2 text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 rounded-lg transition duration-200"
          >
            Register
          </button>

          <p className="text-[16px] text-center text-gray-300 text-sm">
            Already have an account? <Link to="/auth/login" 
            className="text-purple-400 hover:underline">Login</Link> right now!
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;