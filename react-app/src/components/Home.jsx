import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import home from '/home.jpg';

const Home = () => {
  const { user } = useAuth();
  const parsedUser = user ? JSON.parse(user) : null;

  return (
    <div>
      <div className="image-div">
        <img src={home} className="object-cover w-full h-full" />
      </div>

      {user && (
        <motion.h1 
          className="text-3xl font-bold text-white-500 mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
            Greetings, {parsedUser.name}
        </motion.h1>
      )}

      <div>
        <motion.p
          className="text-3xl font-bold text-white-500 mt-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to Book Hive, the ultimate book catalog!
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 mt-60"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <Link to='/books'>
              <button className="mr-5 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Go to Books
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <Link to='/books/search'>
              <button className="mr-5 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                Search Books
              </button>
            </Link>
          </motion.div>

          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}>
              <Link to='/auth/login'>
                <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                  Sign In
                </button>
              </Link>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default Home;