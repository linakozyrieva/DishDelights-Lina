import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";

function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/footer" element={<Footer />} /> {}
        </Routes>
        <Footer /> {}
    </main>
  );
}

export default App;
