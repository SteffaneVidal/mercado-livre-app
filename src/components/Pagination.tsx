import styles from "../styles/Pagination.module.scss";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <button
          className={styles.pagination__button}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt; Anterior
        </button>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`${styles.pagination__button} ${page === currentPage ? styles.active : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          className={styles.pagination__button}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Próximo &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
