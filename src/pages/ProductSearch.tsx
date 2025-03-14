import { useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/ProductSearch.module.scss";

function ProductSearch() {
  useEffect(() => {
    document.title = "Mercado Libre - Búsqueda de productos";

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Busca y encuentra los mejores productos en Mercado Libre."
      );
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Busca y encuentra los mejores productos en Mercado Libre.";
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="page-background">
      <div className={styles.ProductSearch}>
        <Header />
      </div>
    </div>
  );
}

export default ProductSearch;