import React from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { ShopSkeleton } from "../../components";
import {
  addItemToBase,
  removeItemFromBase,
  updateUserField,
} from "../../firebase";
import { useGetData } from "../../hooks/useGetDataFromDatabase";

import { useGetGameQuery } from "../../redux/games/games.api";
import { getLocalStorage } from "../../utils/localStorage";

import styles from "./Shop.module.css";

const Shop: React.FC = () => {
  const { id } = useParams();
  const data = useGetData();

  const [moneyCount, setMoneyCount] = React.useState<number>(0);
  const [isPurchased, setIsPurchased] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (getLocalStorage("uid")) {
      setMoneyCount(data?.money);
    }
    setIsPurchased(
      Boolean(
        data?.purchasedGames.find((gameId: number) => gameId === Number(id))
      )
    );
  }, [data]);

  const {
    data: game,
    isError,
    isLoading,
    isSuccess,
  } = useGetGameQuery(Number(id));
  console.log(isLoading);
  const submitHandler = () => {
    if (moneyCount - 50 < 0) {
      alert("Not enought money");
    } else {
      updateUserField("money", moneyCount - 50);
      id && addItemToBase("purchasedGames", Number(id));
      id && removeItemFromBase("favGames", Number(id));
    }
  };

  return (
    <>
      {isLoading ? (
        <ShopSkeleton />
      ) : (
        <div className={styles.container}>
          <div className={styles.game_container}>
            <img
              className={styles.image}
              src={game?.background_image}
              alt={game?.name}
            />
          </div>
          <div className={styles.price_container}>
            {isPurchased ? (
              <div className={styles.price}>You already bought this game</div>
            ) : (
              <>
                <h1 className={styles.title}>{game?.name}</h1>
                <div className={styles.price__container}>
                  <p className={styles.price}>
                    <span>$ {moneyCount}</span>
                  </p>
                  <p className={styles.price}>
                    <span>$ 50</span>
                  </p>
                  <p className={styles.price}>
                    <span>$ {moneyCount - 50}</span>
                  </p>
                </div>
                <button
                  className={styles.buttom}
                  onClick={submitHandler}
                  disabled={Boolean(!data)}
                >
                  Buy
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
