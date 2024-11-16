import React, { useState } from "react";
import { BiSolidBookmarkStar } from "react-icons/bi";
import styles from "./FavoriteBanner.module.css";

interface FavoriteBannerProps {
  reference: string | number;
  selected: boolean;
  color?: string;
  activeColor?: string;
  size?: string | number;
  stroke?: string;
  strokeWidth?: string | number;
  style?: React.CSSProperties;
  onToggle?: (selected: boolean, reference: string | number) => boolean;
}

const FavoriteBanner: React.FC<FavoriteBannerProps> = ({
  color = "#b5b5b5",
  activeColor = "#CEA600",
  size = "2em",
  stroke = "white",
  strokeWidth = 0.7,
  selected,
  reference,
  onToggle,
}) => {
  const [active, setSelected] = useState(selected);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = !active;

    // Update the selected state if the onToggle function returns true
    // or if there is no onToggle function
    if (onToggle && onToggle(newSelected, reference)) {
      setSelected(newSelected);
    } else if (!onToggle) {
      setSelected(newSelected);
    }
  };

  return (
    <div>
      <BiSolidBookmarkStar
        className={styles.favoriteBanner}
        color={active ? activeColor : color}
        size={size}
        style={{ stroke, strokeWidth }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {isHovered && (
        <span
          className={styles.tooltip}
          style={{
            position: "absolute",
            top: "-25px",
            backgroundColor: "black",
            color: "white",
            padding: "5px",
            borderRadius: "3px",
            fontSize: "0.8em",
            whiteSpace: "nowrap",
          }}
        >
          Click to {active ? "remove" : "add"} as favorite
        </span>
      )}
    </div>
  );
};

export default FavoriteBanner;
