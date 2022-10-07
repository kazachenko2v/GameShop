import React from "react";
import Skeleton from "react-loading-skeleton";

import styles from "./ShopSkeleton.module.css";

const ShopSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.game__container} />
      <div className={styles.info__container}>
        <Skeleton count={5} className={styles.info__title} />
      </div>
    </div>
  );
};

export default ShopSkeleton;
