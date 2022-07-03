import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addGame, removeGame } from "../../redux/favorite/slice";
import { getFavorite } from "../../redux/favorite/selectors";

import {
  setLocalStorage,
  removeItemLocalStorage,
} from "../../utils/localStorage";
// import { fetchGameById } from "../../utils/fetchGameById";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./GamePage.module.css";
import cn from "classnames";
import { GAMES_LIST, KEY_ID } from "../../constants";

type TDevelopers = {
  name: string;
};

interface IGamePage {
  id: number;
  background_image: string;
  name: string;
  developers: TDevelopers[];
}

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { gamesId: favoriteGamesId } = useSelector(getFavorite);
  const { id } = useParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [game, setGame] = React.useState<IGamePage>();
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    const fetching = async () => {
      try {
        const { data } = await axios.get(GAMES_LIST + "/" + id + KEY_ID);
        setGame(data);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetching();
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
    // check if the game is in favorites
    const isContain = favoriteGamesId.find((item) => item === Number(id));
    if (game) {
      if (isContain) {
        setIsFavorite(false);
        dispatch(removeGame(game.id));
        removeItemLocalStorage("favorites", game.id);
      } else {
        setIsFavorite(true);
        dispatch(addGame(game.id));
        setLocalStorage("favorites", game.id);
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
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.86941 7.80047C4.61142 8.06316 4.18932 8.06696 3.92664 7.80897L0.532698 4.47563C0.405067 4.35028 0.33317 4.17889 0.33317 4C0.33317 3.82111 0.405067 3.64972 0.532698 3.52437L3.92664 0.191034C4.18932 -0.0669594 4.61142 -0.0631571 4.86941 0.199528C5.1274 0.462212 5.1236 0.884305 4.86092 1.1423L2.63004 3.33333L12.9998 3.33333C13.368 3.33333 13.6665 3.63181 13.6665 4C13.6665 4.36819 13.368 4.66667 12.9998 4.66667L2.63004 4.66667L4.86092 6.8577C5.1236 7.11569 5.1274 7.53779 4.86941 7.80047Z"
                      fill="white"
                    />
                  </svg>
                  <span>Go Back</span>
                </button>
                <button
                  className={cn(styles.favorite, {
                    [styles.favorite_active]: isFavorite,
                  })}
                  onClick={toggleFavorite}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 20.25C12 20.25 2.625 15 2.625 8.62501C2.62519 7.49826 3.01561 6.40635 3.72989 5.53493C4.44416 4.66351 5.4382 4.06636 6.54299 3.84501C7.64778 3.62367 8.79514 3.79179 9.78999 4.32079C10.7848 4.84979 11.5658 5.70702 12 6.74673L12 6.74673C12.4342 5.70702 13.2152 4.84979 14.21 4.32079C15.2049 3.79179 16.3522 3.62367 17.457 3.84501C18.5618 4.06636 19.5558 4.66351 20.2701 5.53493C20.9844 6.40635 21.3748 7.49826 21.375 8.62501C21.375 15 12 20.25 12 20.25Z"
                      fill="#302D2D"
                    />
                  </svg>
                </button>
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
