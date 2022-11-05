import React from "react";

import styles from "./Loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default Loading;
