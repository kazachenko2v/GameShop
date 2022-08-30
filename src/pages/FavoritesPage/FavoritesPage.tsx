import React from "react";
import { useNavigate } from "react-router-dom";

import { FavoriteItem } from "../../components";
import { useGetData } from "../../hooks/useGetDataFromDatabase";

import styles from "./FavoritesPage.module.css";

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const gamesId = useGetData();

  return (
    <>
      {gamesId?.favGames.map((id: number) => (
        <FavoriteItem key={id} id={id} />
      ))}

      {gamesId?.favGames.length === 0 && (
        <h1 className={styles.title_empty}>
          You don't have any favorite games yet.
          <a onClick={() => navigate(-1)}> Go back</a>
        </h1>
      )}
    </>
  );
};

export default FavoritesPage;
