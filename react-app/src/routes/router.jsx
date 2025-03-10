import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookListPage from "../books/BookListPage";
import BookDetails from "../books/BookDetailsPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorPage from "../components/ErrorPage";
import Home from '../components/Home';
import LoginPage from '../auth/LoginPage';
import RegisterPage from "../auth/RegisterPage";
import CreateBookPage from "../books/CreateBookPage";
import EditBookPage from "../books/EditBookPage";
import SearchBooksPage from '../books/SearchBooksPage';

// Add header and footer in router, so that BrowserRouter is not imported in App.jsx
// Basically keep all routing logic in the router file, removing routing logic from App.jsx
const AppRouter = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/books/create" element={<CreateBookPage />} />
            <Route path="/books/:id/details" element={<BookDetails />} />
            <Route path="/books/:id/edit" element={<EditBookPage />} />
            <Route path="/books/search" element={<SearchBooksPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;