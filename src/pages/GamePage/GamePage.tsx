import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { useGetGameQuery } from "../../redux/games/games.api";
import { useAuthListen, useGetData } from "../../hooks/useGetDataFromDatabase";
import {
  addItemToBase,
  removeItemFromBase,
  visitedListListener,
} from "../../firebase";
import { Modal } from "../../components/UI";

import "react-loading-skeleton/dist/skeleton.css";
import styles from "./GamePage.module.css";
import cn from "classnames";
import { useWhyDidYouUpdate } from "ahooks";

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: game,
    isError,
    isLoading,
    isSuccess,
  } = useGetGameQuery(Number(id));
  const currentUser = useAuthListen();
  const data = useGetData();
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);
  const [isPurchased, setIsPurchased] = React.useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsFavorite(
      Boolean(data?.favGames.find((gameId: number) => gameId === Number(id)))
    );
    setIsPurchased(
      Boolean(
        data?.purchasedGames.find((gameId: number) => gameId === Number(id))
      )
    );
  }, [isFavorite, data]);

  React.useEffect(() => {
    visitedListListener(Number(id));
  }, []);

  const toggleFavorite = () => {
    if (currentUser) {
      /*  check if the game is in favorites */
      const isContain = data?.favGames.find(
        (gameId: number) => gameId === Number(id)
      );

      if (isContain) {
        removeItemFromBase("favGames", Number(id));
      } else {
        addItemToBase("favGames", Number(id));
      }
    } else {
      setIsOpenModal(true);
    }
  };

  const purchaseHandler = (path: string) => {
    currentUser ? redirectHandler(path) : setIsOpenModal(true);
  };

  const redirectHandler = (path: string) => {
    setIsOpenModal(false);
    navigate(path);
  };

  return (
    <>
      {isOpenModal && (
        <Modal
          newValue={""}
          error={""}
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          acceptHandler={() => redirectHandler("/signin")}
        >
          <p className={styles.modal__text}>Please, sign in</p>
          <a
            className={styles.modal__button}
            onClick={() => redirectHandler("/signin")}
          >
            Sign In
          </a>
        </Modal>
      )}
      <div className={styles.main}>
        {isError && <span>Sorry, something went wrong...</span>}
        {isLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          isSuccess && (
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
                      [styles.favorite_purchased]: isPurchased,
                    })}
                    title="Add to Favorites"
                    onClick={toggleFavorite}
                  ></button>
                </div>
                <div className={styles.main_title_container}>
                  <div className={styles.main_title_price_container}>
                    <h1 className={styles.main_title}>{game.name}</h1>
                    {isPurchased ? (
                      <a
                        className={styles.main_price}
                        onClick={() => alert("Game Started")}
                      >
                        PLAY
                      </a>
                    ) : (
                      <a
                        className={styles.main_price}
                        onClick={() => purchaseHandler("/shop/" + id)}
                      >
                        BUY $50
                      </a>
                    )}
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
    </>
  );
};

export default GamePage;
