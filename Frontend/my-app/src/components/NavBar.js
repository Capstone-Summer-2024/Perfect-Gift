import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      const fetchUserName = async () => {
        const name = await getUserNameFromDatabase(user.uid);
        setUserName(name);
      };
      fetchUserName();
    }
  }, [user]);

  const handleSignupClick = (event) => {
    event.preventDefault();
    navigate("/register-login?mode=signup");
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate("/register-login?mode=login");
  };

  const handleSignOutClick = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to="/" className={styles.logoLink}>
          <h1>PerfectGift</h1>
        </Link>
      </div>
      {user && (
        <div className={styles.navbarGreeting}>
          <span>Hello, {userName}</span>
        </div>
      )}
      <nav className={styles.navbarLinks}>
        <Link to="/">Home</Link>
        {user ? (
          <button onClick={handleSignOutClick} className={styles.navbarLink}>Sign Out</button>
        ) : (
          <>
            <a href="/register-login?mode=login" onClick={handleLoginClick} className={styles.navbarLink}>
              Login
            </a>
            <a href="/register-login?mode=signup" onClick={handleSignupClick} className={styles.navbarLink}>
              Signup
            </a>
          </>
        )}
      </nav>
    </header>
  );
};

const getUserNameFromDatabase = async (uid) => {
  // Implement this function to fetch the user's name from your database
  return "User"; // Placeholder
};

export default Navbar;
