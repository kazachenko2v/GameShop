import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getFavorite } from "../../redux/favorite/selectors";

import FavoriteItem from "../../components/FavoritesItem";
import styles from "./Favorites.module.css";

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { gamesId } = useSelector(getFavorite);

  return (
    <>
      {gamesId.length ? (
        <>
          {gamesId.map((id: number) => (
            <FavoriteItem key={id} id={id} />
          ))}
        </>
      ) : (
        <h1 className={styles.title_empty}>
          You don't have any favorite games yet.
          <a onClick={() => navigate(-1)}> Go back</a>
        </h1>
      )}
    </>
  );
};

export default Favorites;
