import { useEffect } from "react";
import SearchBox from "../components/SearchBox";

function Home() {
  useEffect(() => {
    document.title = "Mercado Livre - Busque os Melhores Produtos";

    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", "Pesquise e encontre os melhores produtos no Mercado Livre.");
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = "Pesquise e encontre os melhores produtos no Mercado Livre.";
      document.head.appendChild(newMeta);
    }
  }, []);

  return (
    <div>
      <h1>Busque um produto no Mercado Livre</h1>
      <SearchBox />
    </div>
  );
}

export default Home;
