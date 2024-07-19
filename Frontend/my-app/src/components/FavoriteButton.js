import React from "react";
import { auth } from "../config/firebaseConfig";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const FavoriteButton = ({ item }) => {
  const db = getFirestore();
  const user = auth.currentUser;

  const handleFavorite = async () => {
    if (user) {
      const docRef = doc(db, "favorites", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          items: arrayUnion(item)
        });
      } else {
        await setDoc(docRef, {
          items: [item]
        });
      }
    }
  };

  return <button onClick={handleFavorite}>Favorite</button>;
};

export default FavoriteButton;
