import React from "react";
import styles from "./UserSelectionButton.module.css";

const UserSelectionButton = ({
  selection,
  selectedValue,
  handleSelection,
  label,
  iconSrc,
}) => {
  return (
    <button
      className={`${styles.selectionButton} ${
        selectedValue === selection ? styles.selected : ""
      }`}
      onClick={() => handleSelection(selection)}
    >
      <img src={iconSrc} alt={label} className={styles.selectionIcon} />
      <span className={styles.selectionLabel}>{label}</span>
    </button>
  );
};

export default UserSelectionButton;
