import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import ContainerContents from "../components/ContainerContents";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import styles from "../styles/ContainerContents.module.scss";

type Product = {
  id: string;
  title: string;
  price: { 
    currency: string; 
    amount: number; 
    decimals: number; 
    regular_amount?: number;
  }; 
  picture: string;
  condition: string;
  free_shipping: boolean;
};

function Results() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || sessionStorage.getItem("lastSearch") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if (searchQuery) {
      fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}&offset=${offset}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.results)) {
            const formattedProducts: Product[] = data.results.map((item: any) => ({
              id: item.id,
              title: item.title,
              price: {
                currency: item.currency_id || "ARS",
                amount: item.price,
                decimals: 2, 
                regular_amount: item.original_price || undefined, 
              },
              picture: item.thumbnail,
              condition: item.condition || "Desconocido",
              free_shipping: item.shipping?.free_shipping || false,
            }));

            setProducts((prevProducts) => {
              if (offset === 0) {
                return formattedProducts; 
              }
              return [...prevProducts, ...formattedProducts]; 
            });
          }
          sessionStorage.setItem("lastSearch", searchQuery);
        })
        .catch((error) => console.error("Error al buscar productos:", error));
    }
  }, [searchQuery, offset]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newOffset = (newPage - 1) * itemsPerPage;

    if (newOffset >= products.length) {
      setOffset(newOffset);
    }
  };

  return (
    <div className="page-background">
      <Header />
      <ContainerContents>
        {products.length > 0 ? (
          <ProductList
            products={products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
          />
        ) : (
          <p className={styles.noResults}>No se encontraron productos.</p>
        )}
      </ContainerContents>
      <footer className={styles.paginationContainer}>
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </footer>
    </div>
  );
}

export default Results;
