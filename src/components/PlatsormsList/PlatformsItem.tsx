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
  const [isActive, setisActive] = React.useState(false);

  React.useEffect(() => {
    setisActive(platformsId.includes(item.id));
  }, [isActiveMenu]);

  const clickHandler = () => {
    setisActive(!isActive);
    togglePlatforms(item.id);
  };

  return (
    <label
      className={cn(styles.link, { [styles.link__active]: isActive })}
      onClick={clickHandler}
    >
      <span
        className={cn(styles.checkbox, {
          [styles.checkbox__active]: isActive,
          [styles.checkbox__hover]: !isActive,
        })}
      ></span>
      <span>{item.name}</span>
    </label>
  );
};

export default PlatformsItem;
