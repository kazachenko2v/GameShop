import React from "react";
import { updateUserField } from "../../firebase";
import Skeleton from "react-loading-skeleton";

import { Input, Modal } from "../UI";

import { useGetData } from "../../hooks/useGetDataFromDatabase";
import useIsLoading from "../../hooks/useIsLoading";
import styles from "./MoneyCount.module.css";

const MoneyCount: React.FC = () => {
  const data = useGetData();
  const isLoadingDB = useIsLoading(data);
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [newMoneyCount, setNewMoneyCount] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const submitHandler = () => {
    const isPositive = Math.sign(Number(newMoneyCount)) === -1;
    if (isNaN(Number(newMoneyCount)) || isPositive) {
      setError("Please, enter the correct value");
    } else {
      updateUserField("money", data?.money + Number(newMoneyCount));
      setIsOpenModal(false);
    }
  };

  React.useEffect(() => {
    setError("");
    setNewMoneyCount("");
  }, [isOpenModal]);

  return (
    <>
      {isLoadingDB ? (
        <Skeleton className={styles.skeleton} />
      ) : (
        <div
          className={styles.nav__link}
          onClick={() => setIsOpenModal(!isOpenModal)}
        >
          $ {Number.isNaN(data?.money) ? <Skeleton /> : data?.money}
        </div>
      )}
      {isOpenModal && (
        <Modal
          newValue={newMoneyCount}
          error={error}
          setIsOpen={setIsOpenModal}
          acceptHandler={submitHandler}
        >
          <Input
            newValue={newMoneyCount}
            value={""}
            setError={setError}
            setValue={setNewMoneyCount}
            acceptHandler={submitHandler}
          />
        </Modal>
      )}
    </>
  );
};

export default MoneyCount;
