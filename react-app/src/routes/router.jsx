import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookListPage from "../books/BookList";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookListPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;