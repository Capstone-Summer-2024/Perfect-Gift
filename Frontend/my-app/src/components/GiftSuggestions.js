import React from "react";
import styles from "./GiftSuggestions.module.css";
import { Link } from "react-router-dom";

const GiftSuggestions = ({ items, onItemClick }) => {
  return (
    <div className={styles.suggestionsContainer}>
      <h3>Suggested Gift Items</h3>
      <div className={styles.itemsContainer}>
        {items.map((item, index) => (
          <div
            key={index}
            className={styles.itemCard}
            onClick={() => onItemClick(item)}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftSuggestions;
