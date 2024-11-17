import styles from "./Pagination.module.css";
import PaginationButton from "./PaginationButton";
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
      <PaginationButton
        onClick={() => onPageChange("prev")}
        disabled={currentPage <= 1}
        icon={<BiLeftArrowAlt size={iconSize} />}
      />
      <span className={styles.pageInfo}>
        {currentPage} / {totalPages}
      </span>
      <PaginationButton
        onClick={() => onPageChange("next")}
        disabled={currentPage >= totalPages}
        icon={<BiRightArrowAlt size={iconSize} />}
      />
    </div>
  );
};

export default Pagination;
