import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addGame, removeGame } from "../../redux/favorite/slice";
import { getFavorite } from "../../redux/favorite/selectors";
import { useGetGameQuery } from "../../redux/games/games.api";

import {
  addItemLocalStorage,
  removeItemLocalStorage,
} from "../../utils/localStorage";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./GamePage.module.css";
import cn from "classnames";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { gamesId: favoriteGamesId } = useSelector(getFavorite);
  const { data: game, isError, isLoading } = useGetGameQuery(id);
  const [isFavorite, setIsFavorite] = React.useState(false);

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
      {isError && (
        <div>
          <span>Sorry, something went wrong...</span>
          <div className={styles.links_container}>
            <button className={styles.back_link} onClick={() => navigate(-1)}>
              <span className={styles.arrow}></span>
              <span className={styles.back_link__text}>Go Back</span>
            </button>
            <button
              className={cn(styles.favorite, {
                [styles.favorite_active]: isFavorite,
              })}
              onClick={toggleFavorite}
            ></button>
          </div>
        </div>
      )}
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
                  <span className={styles.back_link__text}>Go Back</span>
                </button>
                <button
                  className={cn(styles.favorite, {
                    [styles.favorite_active]: isFavorite,
                  })}
                  title="Add to Favorites"
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
                    BUY
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
