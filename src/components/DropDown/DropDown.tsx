import React from "react";
import { DropDownProps } from "../types";

import styles from "./DropDown.module.css";
import cn from "classnames";

const DropDown: React.FC<DropDownProps> = ({
  children,
  value,
  isActive,
  dropDownRef,
  buttonOnClickHandler,
}) => {
  return (
    <div ref={dropDownRef} className={styles.container}>
      <button
        className={cn(styles.dropdown__button, {
          [styles.dropdown__button_not_acive]: !isActive,
          [styles.dropdown__button_active]: isActive,
        })}
        onClick={buttonOnClickHandler}
      >
        <span>{value}</span>
        <span
          className={cn(styles.arrow, { [styles.arrow_acive]: isActive })}
        ></span>
      </button>
      <div
        className={cn(styles.dropdown__menu, {
          [styles.dropdown__menu_active]: isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
