import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetGameQuery } from "../../redux/games/games.api";
import { getIsAuth } from "../../redux/authentication/selectors";
import { useListenGamesFromDatabase } from "../../hooks/useGetDataFromDatabase";
import { addItemToBase, removeItemToBase } from "../../utils/toggleItemInDb";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./GamePage.module.css";
import cn from "classnames";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: game, isSuccess, isError, isLoading } = useGetGameQuery(id);
  const gamesId = useListenGamesFromDatabase();
  const { userId } = useSelector(getIsAuth);
  const [isFavorite, setIsFavorite] = React.useState<boolean | null>(false);

  React.useEffect(() => {
    setIsFavorite(
      gamesId &&
        Boolean(
          gamesId.favGames.find((gameId: number) => gameId === Number(id))
        )
    );
  }, [isFavorite, gamesId]);

  const toggleFavorite = () => {
    /*  check if the game is in favorites */
    const isContain =
      gamesId &&
      gamesId.favGames.find((gameId: number) => gameId === Number(id));

    if (isContain) {
      removeItemToBase(userId, Number(id));
      setIsFavorite(false);
    } else {
      addItemToBase(userId, Number(id));
      setIsFavorite(true);
    }
  };

  return (
    <div className={styles.main}>
      {isError && <span>Sorry, something went wrong...</span>}
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
