import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Close from "../../assets/images/close.svg";
import { GAMES_LIST, KEY_ID } from "../../constants";
import { removeGame } from "../../redux/favorite/slice";
import { TGamesItem } from "../../redux/games/types";
import { removeItemLocalStorage } from "../../utils/localStorage";

import styles from "./FavoriteItem.module.css";

type FavoriteItemProps = {
  id: number;
};

const FavoriteItem: React.FC<FavoriteItemProps> = ({ id }) => {
  const dispatch = useDispatch();
  const [game, setGame] = React.useState<TGamesItem>();
  const [isLoading, setIsLoading] = React.useState(true);

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
  }, []);

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
            <button className={styles.price}>$49.99</button>
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
