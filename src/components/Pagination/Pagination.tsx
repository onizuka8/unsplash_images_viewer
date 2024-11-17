import React from "react";
import styles from "./Pagination.module.css";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (direction: "next" | "prev") => void;
  iconSize?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  iconSize = "1.2em",
}) => {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange("prev")}
        disabled={currentPage <= 1}
        className={styles.paginationButton}
      >
        <BiLeftArrowAlt size={iconSize} />
      </button>
      <span className={styles.pageInfo}>
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange("next")}
        disabled={currentPage >= totalPages}
        className={styles.paginationButton}
      >
        <BiRightArrowAlt size={iconSize} />
      </button>
    </div>
  );
};

export default Pagination;
