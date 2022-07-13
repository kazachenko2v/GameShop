import React from "react";
import { PlatformsList, Dates } from "../";

import styles from "./SortContainer.module.css";

const SortContainer: React.FC = () => {
  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <PlatformsList />
      </li>
      <li className={styles.item}>
        <Dates />
      </li>
    </ul>
  );
};

export default SortContainer;
