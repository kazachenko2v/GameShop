import { useSelector } from "react-redux";

import styles from "./Favorites.module.css";
import cn from "classnames";

const Favorites = () => {
  const count = useSelector((state) => state.favorite.count);

  return (
    <li className={styles.nav__link}>
      <span>Favorites</span>
      <span
        className={cn(styles.count, { [styles.count_invisible]: count === 0 })}
      >
        {count}
      </span>
    </li>
  );
};

export default Favorites;
