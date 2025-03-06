import { useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/Header.module.scss";

function Home() {
  useEffect(() => {
    document.title = "Mercado Livre - Buscar produtos";

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Pesquise e encontre os melhores produtos no Mercado Livre."
      );
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Pesquise e encontre os melhores produtos no Mercado Livre.";
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div className="page-background">
      <div className={styles.home}>
        <Header />
      </div>
    </div>
  );
}

export default Home;

