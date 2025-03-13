import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductSearch from "./pages/ProductSearch";
import Results from "./pages/ProductList";
import Product from "./pages/ProductDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductSearch />} />
        <Route path="/items" element={<Results />} />
        <Route path="/items/:id" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
