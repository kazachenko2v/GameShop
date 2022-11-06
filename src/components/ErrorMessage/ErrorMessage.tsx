import React from "react";

import styles from "./ErrorMessage.module.css";

const WithError: React.FC = () => {
  return (
    <h1 className={styles.title}>Sorry, something went wrong... Try again</h1>
  );
};

export default WithError;
