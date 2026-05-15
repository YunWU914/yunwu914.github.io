import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import SearchPage from './pages/SearchPage';
import ManualsPage from './pages/ManualsPage';

function App() {
  return (
    <Router basename="/论坛">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/manuals" element={<ManualsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
