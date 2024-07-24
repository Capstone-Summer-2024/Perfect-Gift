// FavoritesGrid.js
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebaseConfig";
import styles from "./FavoritesGrid.module.css";
import { FaHeart } from "react-icons/fa";

const FavoritesGrid = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const [openPopup, setOpenPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const db = getFirestore();
        const userRef = doc(db, "users", user.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists) {
            setFavorites(userDoc.data().favorites || []);
          } else {
            console.error("No such document!");
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching favorites:", error);
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = (product) => {
    setOpenPopup(true);
    setCurrentProduct(product);
  };

  const confirmRemoveFavorite = async () => {
    if (user && currentProduct) {
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userRef, {
          favorites: arrayRemove(currentProduct),
        });
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.asin !== currentProduct.asin)
        );
        console.log("Removed from favorites:", currentProduct);
      } catch (error) {
        console.error("Error removing from favorites:", error);
      }
    } else {
      console.log("User not authenticated");
    }
    setOpenPopup(false);
    setCurrentProduct(null);
  };

  return (
    <div className={styles.favoritesGridContainer}>
      <h2 className={styles.header}>My Favorite Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.productGrid}>
          {favorites.length > 0 ? (
            favorites.map((product, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.heartIcon} onClick={() => handleRemoveFavorite(product)}>
                  <FaHeart color="red" />
                </div>
                <img
                  src={product.product_photo}
                  alt={product.product_title}
                  className={styles.productImage}
                />
                <div className={styles.cardContent}>
                  <h4 className={styles.productTitle}>{product.product_title}</h4>
                  <p className={styles.productPrice}>{product.product_price}</p>
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.viewButton}
                      onClick={() => window.open(product.product_url, "_blank")}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No favorites found</p>
          )}
        </div>
      )}

      {openPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Remove Favorite</h2>
            <p>Do you want to remove this item from favorites?</p>
            <div className={styles.popupButtons}>
              <button className={styles.removeButton} onClick={confirmRemoveFavorite}>Remove</button>
              <button className={styles.cancelButton} onClick={() => setOpenPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesGrid;
