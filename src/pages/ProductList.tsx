import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import ContainerContents from "../components/ContainerContents";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import styles from "../styles/ContainerContents.module.scss";

function Results() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    if (searchQuery) {
      fetch(`http://localhost:5001/api/items?q=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.items);
          sessionStorage.setItem(searchQuery, JSON.stringify(data.items));
          console.log("Produtos recebidos:", data.items.length);
        })
        .catch((error) => console.error("Erro ao buscar produtos:", error));
    }

    document.title = `Resultados para "${searchQuery}" - Mercado Livre`;
  }, [searchQuery]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }, [products, currentPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(products.length / itemsPerPage);
  }, [products.length, itemsPerPage]);

  return (
  <div className="page-background">
    <Header />EU SOU A TELA DE Resultados da busca ProductList
    <ContainerContents>
      <ProductList products={currentProducts} />
    </ContainerContents>
    <footer className={styles.paginationContainer}>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </footer>
  </div>
);

}

export default Results;
