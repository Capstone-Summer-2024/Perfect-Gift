import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./LoginSignup.module.css";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const LoginSignup = () => {
  const location = useLocation();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    if (mode === "signup") {
      setIsSignup(true);
    } else {
      setIsSignup(false);
    }
  }, [location]);

  const handleSwitch1 = () => {
    setIsSignup(true);
  };

  const handleSwitch2 = () => {
    setIsSignup(false);
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optionally, save the fullname in your database
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.backbox}>
          <div className={`${styles.loginMsg} ${isSignup ? styles.visibility : ""}`}>
            <div className={styles.textcontent}>
              <p className={styles.title}>Don't have an account?</p>
              <p>Sign up to save all your gift items.</p>
              <button id="switch1" onClick={handleSwitch1}>
                Sign Up
              </button>
            </div>
          </div>
          <div className={`${styles.signupMsg} ${isSignup ? "" : styles.visibility}`}>
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
              <input type="text" name="email" placeholder="  EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" name="password" placeholder="  PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <p>FORGET PASSWORD?</p>
            <button onClick={handleLogin}>LOG IN</button>
            {error && <p className={styles.error}>{error}</p>}
          </div>

          <div className={`${styles.signup} ${isSignup ? "" : styles.hide}`}>
            <h2>SIGN UP</h2>
            <div className={styles.inputbox}>
              <input type="text" name="fullname" placeholder="  FULLNAME" value={fullname} onChange={(e) => setFullname(e.target.value)} />
              <input type="text" name="email" placeholder="  EMAIL" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" name="password" placeholder="  PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleSignup}>SIGN UP</button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
