import React, { useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import styles from "./CommentBanner.module.css";
import { createPortal } from "react-dom";

interface CommentBannerProps {
  color?: string;
  emptyColor?: string;
  activeColor?: string;
  size?: string | number;
  stroke?: string;
  strokeWidth?: string | number;
  style?: React.CSSProperties;
  comment?: string;
  onCommentSave?: (comment: string) => void;
}

const CommentBanner: React.FC<CommentBannerProps> = ({
  color = "rgba(255, 190, 0, 0.8)",
  emptyColor = "gray",
  size = "1.5em",
  stroke = "white",
  strokeWidth = 0.1,
  comment = "",
  onCommentSave,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // commentText is used to display and preserve the saved comment value
  const [commentText, setCommentText] = useState(comment);
  const [textareaValue, setTextareaValue] = useState(comment);

  // Show tooltip when hovering over the comment icon
  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPopup(true);
  };

  const handleConfirm = () => {
    if (onCommentSave) {
      onCommentSave(textareaValue);
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
        color={commentText === "" ? emptyColor : color}
        size={size}
        style={{ stroke, strokeWidth }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      {showTooltip && (
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
