import React from "react";
import styles from "./GiftSuggestions.module.css";

const GiftSuggestions = ({ items }) => {
  return (
    <div className={styles.suggestionsContainer}>
      <h3>Suggested Gift Items</h3>
      <div className={styles.itemsContainer}>
        {items.map((item, index) => (
          <div key={index} className={styles.itemCard}>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiftSuggestions;
