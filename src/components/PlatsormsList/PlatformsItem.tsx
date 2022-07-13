import React from "react";

import cn from "classnames";
import styles from "./PlatformsList.module.css";

type PlatformsItemProps = {
  item: {
    id: number;
    name: string;
  };
  isActiveMenu: boolean;
  togglePlatforms: (id: number) => void;
  platformsId: number[];
};

const PlatformsItem: React.FC<PlatformsItemProps> = ({
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

export default PlatformsItem;
