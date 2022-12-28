import React from "react";

import { ImageWithLoader } from "..";
import { useGetGameQuery } from "../../redux/games/games.api";
import { IdItemProps } from "../types";

import styles from "./GamesCardMini.module.css";

const GamesCardMini: React.FC<IdItemProps> = ({ id }) => {
  const { data: game, isSuccess } = useGetGameQuery(id);

  return (
    <>
      {isSuccess && (
        <div className={styles.item}>
          <div className={styles.img_container}>
            <ImageWithLoader image={game.background_image} name={game.name} />
          </div>
          <h2 className={styles.title}>{game.name}</h2>
        </div>
      )}
    </>
  );
};

export default GamesCardMini;
