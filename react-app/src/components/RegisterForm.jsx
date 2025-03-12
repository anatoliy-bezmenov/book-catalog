import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link} from "react-router-dom";
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
    <div className="flex items-center justify-center h-[30vh] bg-black mx-auto mt-[25vh]">
      <div className="w-full max-w-sm p-8 bg-[#121212] shadow-lg rounded-2xl border border-gray-800">
      <h2 className="text-2xl font-semibold text-white text-center mb-4">Register</h2>
      {errors.credentials && <p className="text-red-500 text-sm text-center">{errors.credentials.message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-300">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 p-2 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="w-full mt-1 p-2 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="w-full mt-1 p-2 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="w-full mt-1 p-2 bg-black text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          disabled={!isValid}
          className="w-full p-2 text-white bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 rounded-lg transition duration-200"
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