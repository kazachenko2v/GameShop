import React from "react";
import { useNavigate } from "react-router-dom";

import { FavoriteItem } from "../../components";
import { useGetData } from "../../hooks/useGetDataFromDatabase";

import styles from "../FavoritesPage/FavoritesPage.module.css";

const Library: React.FC = () => {
  const navigate = useNavigate();
  const data = useGetData();

  return (
    <>
      {data?.purchasedGames.map((id: number) => (
        <FavoriteItem key={id} id={id} value={"Play"} />
      ))}

      {data?.purchasedGames.length === 0 && (
        <h1 className={styles.title_empty}>
          You don't have any favorite games yet.
          <button onClick={() => navigate(-1)}> Go back</button>
        </h1>
      )}
    </>
  );
};

export default Library;
