import Pagination from "./Pagination";
import styles from "./Pagination.module.css";

const PaginationControls: React.FC<{
  favoritesView: boolean;
  page: number;
  totalPages: number;
  favoritesPage: number;
  favoritesTotalPages: number;
  handleSearchPagination: (direction: "next" | "prev") => void;
  handleFavoritesPagination: (direction: "next" | "prev") => void;
}> = ({
  favoritesView,
  page,
  totalPages,
  favoritesPage,
  favoritesTotalPages,
  handleSearchPagination,
  handleFavoritesPagination,
}) => (
  <div className={styles.pagination}>
    {!favoritesView ? (
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handleSearchPagination}
      />
    ) : (
      <Pagination
        currentPage={favoritesPage}
        totalPages={favoritesTotalPages}
        onPageChange={handleFavoritesPagination}
      />
    )}
  </div>
);

export default PaginationControls;
