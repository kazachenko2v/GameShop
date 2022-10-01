import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

import { GamesCardMini, Modal } from "../../components";
import { useAuthListen, useGetData } from "../../hooks/useGetDataFromDatabase";
import { updateUserField } from "../../firebase";

import UserPic from "../../assets/images/non-login-user.png";
import Pen from "../../assets/images/pen.svg";
import styles from "./Account.module.css";
import { Input } from "../../components/forms";

const Account: React.FC = () => {
  const data = useGetData();
  const currentUser = useAuthListen();
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [newName, setNewName] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    setName(data?.name);
  }, [data]);

  const acceptNewName = () => {
    if (newName.length === 0) {
      setError("Please, enter the correct name");
    } else {
      updateUserField("name", newName);
      setIsOpenModal(false);
    }
  };

  React.useEffect(() => {
    setError("");
    setNewName("");
  }, [isOpenModal]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image__container}>
          <img className={styles.image} src={UserPic} alt="User" />
        </div>
        <div className={styles.user__info}>
          {data ? (
            <>
              <div className={styles.name__container}>
                <h1 className={styles.user__name}>{name}</h1>
                <button
                  className={styles.rename}
                  onClick={() => setIsOpenModal(true)}
                >
                  <img src={Pen} alt="Rename" />
                </button>
              </div>

              <h2 className={styles.user__uid}>id: {currentUser?.uid}</h2>
              <h2 className={styles.user__email}>
                email: {currentUser?.email}
              </h2>
            </>
          ) : (
            <Skeleton count={3} className={styles.skeleton} />
          )}
        </div>
      </div>
      {isOpenModal && (
        <Modal
          newValue={newName}
          error={error}
          setIsOpen={setIsOpenModal}
          acceptHandler={acceptNewName}
        >
          <Input
            newValue={newName}
            value={name}
            setError={setError}
            setValue={setNewName}
            acceptHandler={acceptNewName}
          />
        </Modal>
      )}
      <h2 className={styles.visited__title}>Last Visited Games</h2>
      <div className={styles.visited__list}>
        {data
          ? data?.lastVisitedGames.map((id: number) => (
              <Link key={id} to={"/" + id}>
                <GamesCardMini id={id} />
              </Link>
            ))
          : [...new Array(4)].map((_, index) => (
              <div key={index} className={styles.skeleton__card__container}>
                <Skeleton className={styles.skeleton__card} />
              </div>
            ))}
      </div>
    </>
  );
};

export default Account;
