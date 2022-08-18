import React from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

import { FavoriteItem } from "../../components";
import { useGamesListener } from "../../hooks/useGetDataFromDatabase";

import styles from "./FavoritesPage.module.css";

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const gamesId = useGamesListener();

  return (
    <>
      {gamesId === null &&
        [...new Array(3)].map((_, index) => (
          <Skeleton key={index} className={styles.skeleton} />
        ))}
      {gamesId && (
        <>
          {gamesId.favGames.map((id: number) => (
            <FavoriteItem key={id} id={id} />
          ))}
        </>
      )}

      {gamesId && gamesId.favGames.length === 0 && (
        <h1 className={styles.title_empty}>
          You don't have any favorite games yet.
          <a onClick={() => navigate(-1)}> Go back</a>
        </h1>
      )}
    </>
  );
};

export default FavoritesPage;
