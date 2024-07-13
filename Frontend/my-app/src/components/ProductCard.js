import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onAddToFavorites }) => {
  const handleViewClick = () => {
    window.open(product.product_url, "_blank");
  };

  return (
    <div className={styles.card}>
      <img
        src={product.product_photo}
        alt={product.product_title}
        className={styles.productImage}
      />
      <div className={styles.cardContent}>
        <h4 className={styles.productTitle}>{product.product_title}</h4>
        <p className={styles.productPrice}>{product.product_price}</p>
        <div className={styles.buttonGroup}>
          <button className={styles.viewButton} onClick={handleViewClick}>
            View
          </button>
          <button
            className={styles.favButton}
            onClick={() => onAddToFavorites(product)}
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
