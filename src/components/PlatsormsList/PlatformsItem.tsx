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
  const [isHover, setIsHover] = React.useState(false);

  React.useEffect(() => {
    setIsActive(platformsId.includes(item.id));
  }, [isActiveMenu]);

  const clickHandler = () => {
    setIsActive(!isActive);
    togglePlatforms(item.id);
  };

  return (
    <label
      className={cn(styles.link, { [styles.link__active]: isActive })}
      onClick={clickHandler}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <span
        className={cn(styles.checkbox, {
          [styles.checkbox__active]: isActive,
        })}
      >
        {(isHover || isActive) && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.1324 4.18971C13.3958 4.44695 13.4008 4.86903 13.1436 5.13245L6.63318 11.7991C6.502 11.9334 6.32025 12.0062 6.13261 11.9996C5.94496 11.9929 5.76882 11.9075 5.64748 11.7642L2.82456 8.43084C2.58662 8.14987 2.62149 7.7292 2.90246 7.49126C3.18344 7.25331 3.6041 7.28819 3.84205 7.56916L6.19132 10.3432L12.1897 4.20088C12.4469 3.93747 12.869 3.93246 13.1324 4.18971Z"
              fill="black"
            />
          </svg>
        )}
      </span>
      <span>{item.name}</span>
    </label>
  );
};

export default PlatformsItem;
