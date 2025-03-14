import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductSearch from "./pages/ProductSearch";
import ProductDetails from "./pages/ProductDetail";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductSearch />} />
        <Route path="/items" element={<Results />} />
        <Route path="/items/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
