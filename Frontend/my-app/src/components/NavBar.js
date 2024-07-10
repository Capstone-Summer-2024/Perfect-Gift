// prev nav bar components, will get used after user sign up
// import "./NavBar.css";
// import LoginLogo from "../assets/LoginLogo.png";
// import DropdownLogo from "../assets/DropdownLogo.png";

// function NavBar() {
//   return (
//     <header className="NavBar">
//       <span
//         style={{ fontSize: "2rem", fontWeight: "bold", fontStyle: "normal" }}
//       >
//         Perfect Gift
//       </span>

//       <p1 class="NavButtons">
//         <DropdownButton />
//         <HeaderLoginButton />
//       </p1>
//     </header>
//   );
// }

// function DropdownButton() {
//   return (
//     <input
//       className="HeaderDropdownButton"
//       type="image"
//       src={DropdownLogo}
//       alt="Dropdown Button"
//       width="75"
//       height="60"
//     />
//   );
// }

// function HeaderLoginButton() {
//   return (
//     <input
//       className="HeaderLoginButton"
//       type="image"
//       src={LoginLogo}
//       alt="Login Button"
//       width="65"
//       height="65"
//     />
//   );
// }

// export default NavBar;

import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = () => {
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
        <Link to="/login">Login</Link>
        <Link to="/login">Signup</Link>
      </nav>
    </header>
  );
};

export default Navbar;