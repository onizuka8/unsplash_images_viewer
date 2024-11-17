import React, { useState } from "react";
import { BiCommentDetail } from "react-icons/bi"; // You can change this icon to something more suitable
import styles from "./CommentBanner.module.css";
import { createPortal } from "react-dom";

interface CommentBannerProps {
  color?: string;
  activeColor?: string;
  size?: string | number;
  stroke?: string;
  strokeWidth?: string | number;
  style?: React.CSSProperties;
  comment?: string;
  onCommentSave?: (comment: string) => void; // Added comment parameter
}

const CommentBanner: React.FC<CommentBannerProps> = ({
  color = "rgba(255, 190, 0, 0.8)",
  size = "1.5em",
  stroke = "white",
  strokeWidth = 0.1,
  comment = "",
  onCommentSave,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [commentText, setCommentText] = useState(comment); // State for text input
  const [textareaValue, setTextareaValue] = useState(comment);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopup(true); // Show the popup when clicked
  };

  const handleConfirm = () => {
    if (onCommentSave) {
      onCommentSave(textareaValue);
      // Update commentText as it has been saved
      setCommentText(textareaValue);
    }
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setCommentText(commentText);
  };

  return (
    <div>
      <BiCommentDetail
        className={styles.commentBanner}
        color={color}
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
            bottom: "30px",
            backgroundColor: "black",
            color: "white",
            padding: "5px",
            borderRadius: "3px",
            fontSize: "0.8em",
            whiteSpace: "nowrap",
          }}
        >
          Click to add a comment
        </span>
      )}

      {showPopup &&
        createPortal(
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <div className={styles.popupContent}>
              <h3>Add Comment</h3>
              <textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="Write your comment here..."
                className={styles.textarea}
              />
              <div className={styles.popupActions}>
                <button onClick={handleCancel} className={styles.cancelButton}>
                  Cancel
                </button>
                <button onClick={handleConfirm} className={styles.confirmButton}>
                  Confirm
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CommentBanner;
