import React, { useState } from "react";
import styles from "./RateProduct.module.css";

const RateProduct = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.rateProductContainer}>
      <p>Rate this suggestion</p>
      <div className={styles.starContainer}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? styles.on : styles.off}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className={styles.star}>&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RateProduct;
