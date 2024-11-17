import { createPortal } from "react-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

import styles from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC = () =>
  createPortal(
    <div className={styles.spinnerContainer}>
      <PacmanLoader
        color={"rgba(250, 190, 0, 1)"}
        loading={true}
        cssOverride={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>,
    document.body
  );

export default LoadingSpinner;
