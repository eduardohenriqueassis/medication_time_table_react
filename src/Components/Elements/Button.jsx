import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onPress, ...props }) => {
  return (
    <button {...props} className={styles.button} onClick={onPress}>
      {children}
    </button>
  );
};

export default Button;
