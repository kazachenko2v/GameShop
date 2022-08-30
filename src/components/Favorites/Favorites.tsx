import React from "react";

import { useAuthListen, useGetData } from "../../hooks/useGetDataFromDatabase";

import styles from "./Favorites.module.css";
import cn from "classnames";
import { getLocalStorage } from "../../utils/localStorage";
import Skeleton from "react-loading-skeleton";

const Favorites: React.FC = () => {
  const data = useGetData();
  const currentUser = useAuthListen();

  return (
    <>
      <span>Favorites</span>
      {currentUser && data && (
        <span
          className={cn(styles.count, {
            [styles.count_invisible]: data.favGames.length === 0,
          })}
        >
          {data.favGames.length}
        </span>
      )}
    </>
  );
};

export default Favorites;
