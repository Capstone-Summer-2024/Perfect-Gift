import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebaseConfig";
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

const ProductList = ({ query, onBack }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1000); // Set initial max price to a reasonable default value
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/gifts/search?query=${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const productsWithPrice = data.products.map((product) => ({
          ...product,
          product_price_value: parseFloat(
            product.product_price.replace(/[^0-9.-]+/g, "")
          ),
        }));
        setProducts(productsWithPrice);
        setFilteredProducts(productsWithPrice);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => product.product_price_value <= maxPrice)
    );
  }, [maxPrice, products]);

  const handleAddToFavorites = async (product) => {
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userRef, {
          favorites: arrayUnion(product)
        });
        console.log("Added to favorites:", product);
      } catch (error) {
        console.error("Error adding to favorites:", error);
      }
    } else {
      console.log("User not authenticated");
    }
  };

  return (
    <div className={styles.productListContainer}>
      <div className={styles.controlBar}>
        <button className={styles.backButton} onClick={onBack}>
          Go Back
        </button>
        <div className={styles.sliderContainer}>
          <label>Max Price: ${maxPrice}</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className={styles.priceSlider}
          />
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onAddToFavorites={handleAddToFavorites}
              />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
