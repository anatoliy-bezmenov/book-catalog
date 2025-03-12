import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="flex items-center justify-center h-[30vh] bg-black mx-auto mt-[25vh]">
      <div className="w-full max-w-sm p-8 bg-[#121212] shadow-lg rounded-2xl border border-gray-800">
        <h2 className="text-3xl font-bold text-center text-purple-400">Login</h2>
        
        {errors.credentials && (
          <p className="mt-2 text-sm text-center text-red-500">{errors.credentials.message}</p>
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
              className="w-full mt-1 px-4 py-2 bg-black text-white bg-[#1E1E1E] border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
                onChange: () => clearErrors("credentials"),
              })}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
  
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 bg-black text-white bg-[#1E1E1E] border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              {...register("password", {
                required: "Password is required.",
                onChange: () => clearErrors("credentials"),
              })}
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
  
          <button
            type="submit"
            disabled={!isValid}
            className="w-full px-4 py-2 font-semibold text-white bg-purple-600 rounded-xl transition duration-200 hover:bg-purple-500 disabled:bg-gray-700"
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