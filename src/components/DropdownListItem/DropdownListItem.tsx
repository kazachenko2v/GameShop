import React from "react";
import { DropdownListItemProps } from "../types";

import styles from "./DropdownListItem.module.css";

const DropdownListItem: React.FC<DropdownListItemProps> = ({
  item,
  isActiveMenu,
  toggleItems,
  itemsId,
}) => {
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    setIsActive(itemsId.includes(item.id));
  }, [isActiveMenu]);

  const clickHandler = () => {
    setIsActive(!isActive);
    toggleItems(item.id);
  };

  return (
    <label className={styles.link}>
      <input
        onChange={clickHandler}
        type="checkbox"
        checked={isActive}
        className={styles.checkbox_input}
      />
      <span className={styles.checkbox}></span>
      <span>{item.name}</span>
    </label>
  );
};

export default DropdownListItem;
