import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addGame, removeGame } from "../../redux/favorite/slice";
import { getFavorite } from "../../redux/favorite/selectors";
import { TGamesItem } from "../../redux/games/types";

import {
  addItemLocalStorage,
  removeItemLocalStorage,
} from "../../utils/localStorage";
import { fetchGameById } from "../../utils/fetching";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./GamePage.module.css";
import cn from "classnames";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gamesId: favoriteGamesId } = useSelector(getFavorite);
  const { id } = useParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [game, setGame] = React.useState<TGamesItem>();
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    fetchGameById(Number(id), setGame, setIsLoading);
    setIsFavorite(
      Boolean(favoriteGamesId.find((gameId) => gameId === Number(id)))
    );
  }, []);

  React.useEffect(() => {
    setIsFavorite(
      Boolean(favoriteGamesId.find((gameId) => gameId === Number(id)))
    );
  }, [isFavorite]);

  const toggleFavorite = () => {
    /*  check if the game is in favorites */
    const isContain = favoriteGamesId.find((item) => item === Number(id));
    if (game) {
      if (isContain) {
        setIsFavorite(false);
        dispatch(removeGame(game.id));
        removeItemLocalStorage("favorites", game.id);
      } else {
        setIsFavorite(true);
        dispatch(addGame(game.id));
        addItemLocalStorage("favorites", game.id);
      }
    }
  };

  return (
    <div className={styles.main}>
      {isLoading ? (
        <Skeleton className={styles.skeleton} />
      ) : (
        game && (
          <>
            <img
              className={styles.main_bgimage}
              src={game.background_image}
              alt={game.name}
            />
            <div className={styles.main_container}>
              <div className={styles.links_container}>
                <button
                  className={styles.back_link}
                  onClick={() => navigate(-1)}
                >
                  <span className={styles.arrow}></span>
                  <span>Go Back</span>
                </button>
                <button
                  className={cn(styles.favorite, {
                    [styles.favorite_active]: isFavorite,
                  })}
                  onClick={toggleFavorite}
                ></button>
              </div>
              <div className={styles.main_title_container}>
                <div className={styles.main_title_price_container}>
                  <h1 className={styles.main_title}>{game.name}</h1>
                  <button
                    className={styles.main_price}
                    onClick={toggleFavorite}
                  >
                    Buy $49.99
                  </button>
                </div>
                <h2 className={styles.main_publisher}>
                  {game.developers[0].name}
                </h2>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default GamePage;
