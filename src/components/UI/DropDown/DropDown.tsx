import React from "react";
import { DropDownProps } from "../../types";

import styles from "./DropDown.module.css";
import cn from "classnames";

const DropDown: React.FC<DropDownProps> = ({
  children,
  value,
  isActive,
  dropDownRef,
  onButtonClickHandler,
}) => {
  return (
    <div ref={dropDownRef} className={styles.container}>
      <button
        className={cn(styles.button, {
          [styles.button_not_acive]: !isActive,
          [styles.button_active]: isActive,
        })}
        onClick={onButtonClickHandler}
      >
        <span>{value[0].toUpperCase() + value.slice(1)}</span>
        <span
          className={cn(styles.arrow, { [styles.arrow_acive]: isActive })}
        ></span>
      </button>
      <div
        className={cn(styles.menu, {
          [styles.menu_active]: isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
