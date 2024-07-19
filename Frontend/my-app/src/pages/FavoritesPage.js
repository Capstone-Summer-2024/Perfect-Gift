import React, { useEffect, useState } from "react";
import { auth } from "../config/firebaseConfig";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const docRef = doc(db, "favorites", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFavorites(docSnap.data().items);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <div>
      <h1>Your Favorites</h1>
      <ul>
        {favorites.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
