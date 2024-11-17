import styles from "./PaginationButton.module.css";

const PaginationButton: React.FC<{
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
}> = ({ onClick, disabled, icon }) => (
  <button onClick={onClick} disabled={disabled} className={styles.paginationButton}>
    {icon}
  </button>
);

export default PaginationButton;
