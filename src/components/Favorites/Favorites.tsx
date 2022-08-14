import React from "react";
import { useListenGamesFromDatabase } from "../../hooks/useGetDataFromDatabase";

import styles from "./Favorites.module.css";
import cn from "classnames";

const Favorites: React.FC = () => {
  const gamesId = useListenGamesFromDatabase();

  return (
    <>
      <span>Favorites</span>
      {gamesId && (
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
