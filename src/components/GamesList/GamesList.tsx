import React from "react";

import { GameCard, GameCardSkeleton } from "..";
import { IGame } from "../../redux/games/types";
import { PAGE_SIZE_COUNT_20 } from "../../constants";
import { GamesListProp } from "../types";

import styles from "./GamesList.module.css";

const GamesList: React.FC<GamesListProp> = ({
  games,
  isLoading,
  isSuccess,
  isError,
}) => {
  return (
    <div className={styles.conteiner}>
      {isLoading &&
        [...new Array(PAGE_SIZE_COUNT_20)].map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      {isSuccess &&
        games.results.map((item: IGame) => (
          <GameCard key={item.id} item={item} />
        ))}
      {isError && <h1>Sorry, something went wrong... Try again</h1>}
      {isSuccess && games.results.length === 0 && (
        <h1>Sorry, no games for you...</h1>
      )}
    </div>
  );
};

export default GamesList;
