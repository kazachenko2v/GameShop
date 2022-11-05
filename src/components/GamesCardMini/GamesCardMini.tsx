import React from "react";

import { useGetGameQuery } from "../../redux/games/games.api";
import { IdItemProps } from "../types";

import styles from "./GamesCardMini.module.css";

const GamesCardMini: React.FC<IdItemProps> = ({ id }) => {
  const { data: game, isSuccess } = useGetGameQuery(id);

  return (
    <>
      {isSuccess && (
        <div className={styles.item}>
          <img
            className={styles.image}
            src={game.background_image}
            alt={game.name}
          />
          <h2 className={styles.title}>{game.name}</h2>
        </div>
      )}
    </>
  );
};

export default GamesCardMini;
