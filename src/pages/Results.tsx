import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import ContainerContents from "../components/ContainerContents";
import Header from "../components/Header";
import styles from "../styles/ContainerContents.module.scss";

function Results() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchQuery && products.length === 0) {
      console.log("Buscando produtos da API...");
      fetch(`http://localhost:5001/api/items?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.items);
          sessionStorage.setItem(searchQuery, JSON.stringify(data.items));
          console.log("Produtos recebidos da API:", data.items);
        })
        .catch((error) => console.error("Erro ao buscar produtos:", error));
    }

    document.title = `Resultados para "${searchQuery}" - Mercado Livre`;

    const metaDescription = document.querySelector("meta[name='description']");
    const descriptionContent = `Veja os melhores produtos para "${searchQuery}" no Mercado Livre.`;

    if (metaDescription) {
      metaDescription.setAttribute("content", descriptionContent);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = descriptionContent;
      document.head.appendChild(newMeta);
    }
  }, [searchQuery, products.length]);

  const productsMemo = useMemo(() => products, [JSON.stringify(products)]);

  return (
    <div className="page-background">
      <Header />
      <ContainerContents>
        <h1 className={styles.resultsTitle}>
          Resultados para: {searchQuery}
        </h1>
        <ProductList products={productsMemo} />
      </ContainerContents>
    </div>
  );
}

export default Results;
