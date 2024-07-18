import React from "react";
import styles from "./PopupWarning.module.css";

const PopupWarning = ({ message, show }) => {
  return (
    <div className={`${styles.popup} ${show ? styles.show : ""}`}>
      {message}
    </div>
  );
};

export default PopupWarning;
