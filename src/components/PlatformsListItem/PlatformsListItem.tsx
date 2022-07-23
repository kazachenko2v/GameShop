import React from "react";
import { PlatformsLIstItemProps } from "../types";

import styles from "./PlatformsListItem.module.css";

const PlatformsListItem: React.FC<PlatformsLIstItemProps> = ({
  item,
  isActiveMenu,
  togglePlatforms,
  platformsId,
}) => {
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    setIsActive(platformsId.includes(item.id));
  }, [isActiveMenu]);

  const clickHandler = () => {
    setIsActive(!isActive);
    togglePlatforms(item.id);
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

export default PlatformsListItem;
