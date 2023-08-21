import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.customLoader}></div>
    </div>
  );
};

export default Loading;
