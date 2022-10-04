import React from "react";
import { updateUserField } from "../../firebase";
import Skeleton from "react-loading-skeleton";

import { Modal } from "..";
import { Input } from "../UI";

import { useGetData } from "../../hooks/useGetDataFromDatabase";
import useIsLoading from "../../hooks/useIsLoading";
import { MoneyCountProps } from "../types";
import styles from "./MoneyCount.module.css";

const MoneyCount: React.FC<MoneyCountProps> = ({
  isOpenModal,
  setIsOpenModal,
}) => {
  const data = useGetData();
  const isLoadingDB = useIsLoading(data);
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
        <span>$ {Number.isNaN(data?.money) ? <Skeleton /> : data?.money}</span>
      )}
      {isOpenModal && (
        <Modal
          newValue={newMoneyCount}
          error={error}
          isOpen={isOpenModal}
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
