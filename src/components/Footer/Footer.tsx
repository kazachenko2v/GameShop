import React from "react";

import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.container}>
      <button className={styles.button}>Log In</button>
    </footer>
  );
};

export default Footer;
