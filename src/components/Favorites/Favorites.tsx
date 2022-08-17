import React from "react";

import { useGamesListener } from "../../hooks/useGetDataFromDatabase";
import { auth } from "../../firebase";

import styles from "./Favorites.module.css";
import cn from "classnames";

const Favorites: React.FC = () => {
  const gamesId = useGamesListener();

  return (
    <>
      <span>Favorites</span>
      {gamesId && auth.currentUser && (
        <span
          className={cn(styles.count, {
            [styles.count_invisible]: gamesId.favGames.length === 0,
          })}
        >
          {gamesId.favGames.length}
        </span>
      )}
    </>
  );
};

export default Favorites;
