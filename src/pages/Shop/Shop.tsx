import React from "react";
import { useParams } from "react-router-dom";

import { ShopSkeleton } from "../../components/Skeletons";
import {
  addItemToBase,
  removeItemFromBase,
  updateUserField,
} from "../../firebase";
import { useGetData } from "../../hooks/useGetDataFromDatabase";
import useIsLoading from "../../hooks/useIsLoading";

import { useGetGameQuery } from "../../redux/games/games.api";

import styles from "./Shop.module.css";

const Shop: React.FC = () => {
  const { id } = useParams();
  const data = useGetData();

  const isLoadingDB = useIsLoading(data);

  const [isPurchased, setIsPurchased] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsPurchased(
      Boolean(
        data?.purchasedGames.find((gameId: number) => gameId === Number(id))
      )
    );
  }, [data]);

  const { data: game, isLoading: isLoadingGame } = useGetGameQuery(Number(id));

  const submitHandler = () => {
    if (data?.money - 50 < 0) {
      alert("Not enought money");
    } else {
      updateUserField("money", data?.money - 50);
      id && addItemToBase("purchasedGames", Number(id));
      id && removeItemFromBase("favGames", Number(id));
    }
  };

  return (
    <>
      {isLoadingGame || isLoadingDB ? (
        <ShopSkeleton />
      ) : (
        <div className={styles.container}>
          <div className={styles.game__container}>
            <img
              className={styles.image}
              src={game?.background_image}
              alt={game?.name}
            />
          </div>
          <div className={styles.info__container}>
            {isPurchased ? (
              <div className={styles.price}>You already bought this game</div>
            ) : (
              <>
                <h1 className={styles.title}>{game?.name}</h1>
                <div className={styles.price__container}>
                  <p className={styles.price}>
                    <span>$ {data?.money}</span>
                  </p>
                  <p className={styles.price}>
                    <span>$ 50</span>
                  </p>
                  <p className={styles.price}>
                    <span>$ {data?.money - 50}</span>
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
