import React from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import homepageBg from "../assets/homepageBg.mp4";

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <div className={styles.videoBackground}>
        <video className={styles.video} autoPlay loop muted>
          <source src={homepageBg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.content}>
        <h1>Find The Best Gift For Them</h1>
        <p>
          Take a short personality quiz and be matched with a unique list of
          curated gift ideas built just for them.
        </p>
        <Link to="/collect-info">
          <button className={styles.getStarted}>Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
