import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignupClick = (event) => {
    event.preventDefault();
    navigate("/register-login?mode=signup");
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate("/register-login?mode=login");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to="/" className={styles.logoLink}>
          <h1>PerfectGift</h1>
        </Link>
      </div>
      <nav className={styles.navbarLinks}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/register-login?mode=login" onClick={handleLoginClick}>
          Login
        </Link>
        <Link to="/register-login?mode=signup" onClick={handleSignupClick}>
          Signup
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
