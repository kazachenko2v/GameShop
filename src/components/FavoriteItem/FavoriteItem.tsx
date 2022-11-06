import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { useGetGameQuery } from "../../redux/games/games.api";
import { IdItemProps } from "../types";
import { removeItemFromBase } from "../../firebase";

import Close from "../../assets/images/close.svg";
import styles from "./FavoriteItem.module.css";

const FavoriteItem: React.FC<IdItemProps> = ({ id, value }) => {
  const { data: game, isLoading } = useGetGameQuery(id);

  const removeButton = (id: number) => {
    removeItemFromBase("favGames", id);
  };

  return (
    <>
      {isLoading && <Skeleton className={styles.skeleton} />}
      {game && (
        <div key={game.id} className={styles.items__container}>
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

          {value === "Buy" ? (
            <>
              <Link className={styles.price} to={"/shop/" + id}>
                {value}
              </Link>
              <button
                className={styles.remove__button}
                onClick={() => removeButton(game.id)}
              >
                <img src={Close} alt="Remove" />
              </button>
            </>
          ) : (
            <a className={styles.price} onClick={() => alert("Game started")}>
              {value}
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default FavoriteItem;
