
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 border-b flex justify-between mb-4">
        <div>
          <Link to="/" className="mr-4 text-purple-600 font-semibold">Add Fav</Link>
          <Link to="/favorites" className="text-purple-600 font-semibold">View Favorites</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
