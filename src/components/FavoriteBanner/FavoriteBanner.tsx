import React, { useState } from "react";
import { BiSolidBookmarkStar } from "react-icons/bi";
import styles from "./FavoriteBanner.module.css";

interface FavoriteBannerProps {
  selected: boolean;
  color?: string;
  favoritedColor?: string;
  size?: string | number;
  stroke?: string;
  strokeWidth?: string | number;
  style?: React.CSSProperties;
  onToggle?: (selected: boolean) => boolean;
}

const FavoriteBanner: React.FC<FavoriteBannerProps> = ({
  color = "#b5b5b5",
  favoritedColor = "#CEA600",
  size = "2em",
  stroke = "white",
  strokeWidth = 0.7,
  selected,
  onToggle,
}) => {
  const [isFavorited, setIsFavorited] = useState(selected);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = !isFavorited;

    // Update the selected state if the onToggle function returns true
    // or if there is no onToggle function
    if (onToggle && onToggle(newSelected)) {
      setIsFavorited(newSelected);
    } else if (!onToggle) {
      setIsFavorited(newSelected);
    }
  };

  return (
    <div>
      <BiSolidBookmarkStar
        className={styles.favoriteBanner}
        color={isFavorited ? favoritedColor : color}
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
          Click to {isFavorited ? "remove" : "add"} as favorite
        </span>
      )}
    </div>
  );
};

export default FavoriteBanner;
