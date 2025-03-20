import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import errorImg from "/errorImg.jpg";

const ErrorPage = () => {
  return (
    <div>
      <div className="image-div">
        <img src={errorImg} className="object-cover w-full h-full" />
      </div>

      <div className="mt-40 text-center">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Oops! Page Not Found
        </motion.h1>

        <motion.p
          className="text-[24px] mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          The page you're looking for doesn't exist.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 mt-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link to="/">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Go Home
              </button>
            </Link>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <Link to="/books">
              <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                Go to Books
              </button>
            </Link>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          >
            <Link to="/books/search">
              <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                Search Books
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;