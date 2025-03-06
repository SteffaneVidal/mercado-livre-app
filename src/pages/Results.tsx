import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList.tsx";

function Results() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Buscando produtos da API...");
    if (searchQuery) {
      if (products.length === 0 && searchQuery) {
        fetch(`http://localhost:5001/api/items?q=${searchQuery}`)
          .then((response) => response.json())
          .then((data) => {
            setProducts(data.items);
            console.log("Produtos recebidos da API:", data.items);
            sessionStorage.setItem(searchQuery, JSON.stringify(data.items));
          })
          .catch((error) => console.error("Erro ao buscar produtos:", error));
      }

      document.title = `Resultados para "${searchQuery}" - Mercado Livre`;

      const metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          `Veja os melhores produtos para "${searchQuery}" no Mercado Livre.`
        );
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = `Veja os melhores produtos para "${searchQuery}" no Mercado Livre.`;
        document.head.appendChild(newMeta);
      }
    }
  }, [searchQuery]);

  const productsMemo = useMemo(() => products, [JSON.stringify(products)]);

  return (
    <div>
      <h1>Resultados para: {searchQuery}</h1>
      <ProductList products={productsMemo} />
    </div>
  );
}

export default Results;
