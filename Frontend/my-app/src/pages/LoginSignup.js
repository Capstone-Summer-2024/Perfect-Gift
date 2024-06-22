import React, { useState } from "react";
import styles from "./LoginSignup.module.css";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);

  const handleSwitch1 = () => {
    setIsSignup(true);
  };

  const handleSwitch2 = () => {
    setIsSignup(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.backbox}>
          <div
            className={`${styles.loginMsg} ${
              isSignup ? styles.visibility : ""
            }`}
          >
            <div className={styles.textcontent}>
              <p className={styles.title}>Don't have an account?</p>
              <p>Sign up to save all your gift items.</p>
              <button id="switch1" onClick={handleSwitch1}>
                Sign Up
              </button>
            </div>
          </div>
          <div
            className={`${styles.signupMsg} ${
              isSignup ? "" : styles.visibility
            }`}
          >
            <div className={styles.textcontent}>
              <p className={styles.title}>Have an account?</p>
              <p>Log in to see all your collection.</p>
              <button id="switch2" onClick={handleSwitch2}>
                LOG IN
              </button>
            </div>
          </div>
        </div>

        <div className={`${styles.frontbox} ${isSignup ? styles.moving : ""}`}>
          <div className={`${styles.login} ${isSignup ? styles.hide : ""}`}>
            <h2>LOG IN</h2>
            <div className={styles.inputbox}>
              <input type="text" name="email" placeholder="  EMAIL" />
              <input type="password" name="password" placeholder="  PASSWORD" />
            </div>
            <p>FORGET PASSWORD?</p>
            <button>LOG IN</button>
          </div>

          <div className={`${styles.signup} ${isSignup ? "" : styles.hide}`}>
            <h2>SIGN UP</h2>
            <div className={styles.inputbox}>
              <input type="text" name="fullname" placeholder="  FULLNAME" />
              <input type="text" name="email" placeholder="  EMAIL" />
              <input type="password" name="password" placeholder="  PASSWORD" />
            </div>
            <button>SIGN UP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
