import React from "react";

import { InputProps } from "../types";

import styles from "./Input.module.css";
import cn from "classnames";

const Input: React.FC<InputProps> = ({
  newValue,
  value,
  setValue,
  setError,
  acceptHandler,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const clearValue = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setError("");
    setValue("");
  };
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, []);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setError("");
  };

  return (
    <label className={styles.label}>
      <input
        type="text"
        ref={inputRef}
        onChange={changeValue}
        className={styles.input}
      />
      <button
        onClick={clearValue}
        className={cn(styles.button__remove, {
          [styles.button__remove_active]: newValue?.length > 0,
        })}
      ></button>
      <button className={styles.button} onClick={acceptHandler}>
        OK
      </button>
    </label>
  );
};

export default Input;
