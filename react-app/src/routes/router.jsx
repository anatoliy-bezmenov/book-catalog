import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookListPage from "../books/BookList";
import BookDetails from "../books/BookDetails";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ErrorPage from "../components/ErrorPage";
import Home from '../components/Home';

// Add header and footer in router, so that BrowserRouter is not imported in App.jsx
// Basically keep all routing logic in the router file, removing routing logic from App.jsx
const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookListPage />} />
        <Route path="/books/:id/details" element={<BookDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;