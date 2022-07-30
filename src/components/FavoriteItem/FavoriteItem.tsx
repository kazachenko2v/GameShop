import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeGame } from "../../redux/favorite/slice";
import { removeItemLocalStorage } from "../../utils/localStorage";
import { FavoriteItemProps } from "../types";
import { useGetGameQuery } from "../../redux/game/game.api";

import Close from "../../assets/images/close.svg";
import styles from "./FavoriteItem.module.css";

const FavoriteItem: React.FC<FavoriteItemProps> = ({ id }) => {
  const dispatch = useDispatch();
  const { data: game, isError, isLoading } = useGetGameQuery(id.toString());

  const removeButton = (id: number) => {
    removeItemLocalStorage("favorites", id);
    dispatch(removeGame(id));
  };

  return (
    <>
      {game ? (
        <div key={game.id} className={styles.items__contaier}>
          <Link to={`/${game.id}`}>
            <div className={styles.title__container}>
              <img
                className={styles.image}
                src={game.background_image}
                alt={game.name}
              />
              <h2 className={styles.title}>{game.name} </h2>
            </div>
          </Link>
          <div className={styles.bottons__container}>
            <button className={styles.price}>Buy</button>
            <button
              className={styles.remove__button}
              onClick={() => removeButton(game.id)}
            >
              <img src={Close} alt="Remove" />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FavoriteItem;
