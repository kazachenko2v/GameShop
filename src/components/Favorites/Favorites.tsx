import React from "react";
import { useSelector } from "react-redux";
import { getFavorite } from "../../redux/favorite/selectors";

import styles from "./Favorites.module.css";
import cn from "classnames";

const Favorites: React.FC = () => {
  const { count } = useSelector(getFavorite);

  return (
    <button className={styles.nav__link}>
      <span>Favorites</span>
      <span
        className={cn(styles.count, { [styles.count_invisible]: count === 0 })}
      >
        {count}
      </span>
    </button>
  );
};

export default Favorites;
