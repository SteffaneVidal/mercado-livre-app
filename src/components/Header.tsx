import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Header.module.scss";
import logo from '../assets/logo-mercado-livre.png'
import { IoIosSearch } from "react-icons/io";

function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/items?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className={styles.header}>
      <img src={logo} alt="Mercado libre" className={styles.header__logo} />
      <div className={styles.header__searchContainer}>
        <input
          type="text"
          placeholder="Busca productos, marcas y más..."
          className={styles.header__searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className={styles.header__searchButton} onClick={handleSearch}>
        <span className={styles.divider}></span>
        <IoIosSearch />
        </button>
      </div>
    </header>
  );
}

export default Header;
