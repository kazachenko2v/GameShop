import React from "react";
import { updateUserField } from "../../firebase";
import { Modal } from "..";
import { useGetData } from "../../hooks/useGetDataFromDatabase";
import { MoneyCountProps } from "../types";
import { Input } from "../forms";

const MoneyCount: React.FC<MoneyCountProps> = ({
  isOpenModal,
  setIsOpenModal,
}) => {
  const data = useGetData();
  const [moneyCount, setMoneyCount] = React.useState<number>(0);
  const [newMoneyCount, setNewMoneyCount] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    setMoneyCount(data?.money);
  }, [data]);

  const submitHandler = () => {
    const isPositive = Math.sign(Number(newMoneyCount)) === -1;
    if (isNaN(Number(newMoneyCount)) || isPositive) {
      setError("Please, enter the correct value");
    } else {
      updateUserField("money", moneyCount + Number(newMoneyCount));
      setIsOpenModal(false);
    }
  };

  React.useEffect(() => {
    setError("");
    setNewMoneyCount("");
  }, [isOpenModal]);

  return (
    <>
      <span>$ {moneyCount}</span>
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
