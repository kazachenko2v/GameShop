import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlatformsId } from "../../redux/filter/slice";
import { TPlatformsId } from "../../redux/filter/types";
import { getFilter } from "../../redux/filter/selectors";

import PlatformsItem from "./PlatformsItem";
import { ALL_PLATFORMS } from "../../constants";

import styles from "./PlatformsList.module.css";
import cn from "classnames";

const PlatsormsList: React.FC = () => {
  const dispatch = useDispatch();
  const { platformsId } = useSelector(getFilter);
  const dropDownRef = React.useRef<HTMLDivElement>(null);
  const selectedPlatformsRef = React.useRef<TPlatformsId | null>(null);
  const startPlatformsRef = React.useRef<TPlatformsId | null>(null);
  selectedPlatformsRef.current = [...platformsId];
  startPlatformsRef.current = [...platformsId];
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const togglePlatforms = (id: number) => {
    if (
      selectedPlatformsRef.current?.includes(id) &&
      selectedPlatformsRef.current?.length !== 1
    ) {
      selectedPlatformsRef.current = selectedPlatformsRef.current.filter(
        (item) => item !== id
      );
    } else if (!selectedPlatformsRef.current?.includes(id)) {
      selectedPlatformsRef.current?.push(id);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        /* when you click outside of the dropdown menu */
        dropDownRef.current &&
        !event.composedPath().includes(dropDownRef.current)
      ) {
        const sortedSelectedPlatformsRef = selectedPlatformsRef.current?.sort(
          (a, b) => a - b
        );

        /* compare starting and modified platforms arrays to make a new request or not */
        const toUpdate = !(
          JSON.stringify(startPlatformsRef.current) ===
          JSON.stringify(sortedSelectedPlatformsRef)
        );

        if (toUpdate) {
          if (sortedSelectedPlatformsRef) {
            dispatch(setPlatformsId(sortedSelectedPlatformsRef));
          }
          localStorage.setItem(
            "platformsId",
            JSON.stringify(sortedSelectedPlatformsRef)
          );
        }
        setIsActive(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={dropDownRef} className={styles.container}>
      <button
        className={cn(styles.dropdown__button, {
          [styles.dropdown__button_not_acive]: !isActive,
          [styles.dropdown__button_active]: isActive,
        })}
        onClick={() => setIsActive(!isActive)}
      >
        <span>Platforms</span>
        <svg
          className={cn(styles.arrow, { [styles.arrow_acive]: isActive })}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.528758 0.528575C0.268409 0.788925 0.268409 1.21103 0.528758 1.47138L4.52876 5.47138C4.78911 5.73173 5.21122 5.73173 5.47157 5.47138L9.47157 1.47138C9.73192 1.21104 9.73192 0.788925 9.47157 0.528576C9.21122 0.268226 8.78911 0.268226 8.52876 0.528576L5.00016 4.05717L1.47157 0.528575C1.21122 0.268226 0.789108 0.268226 0.528758 0.528575Z"
            fill="black"
          />
        </svg>
      </button>
      <div
        className={cn(styles.dropdown__menu, {
          [styles.dropdown__menu_deactive]: !isActive,
          [styles.dropdown__menu_active]: isActive,
        })}
      >
        {ALL_PLATFORMS.map((item) => (
          <PlatformsItem
            key={item.id}
            item={item}
            isActiveMenu={isActive}
            togglePlatforms={togglePlatforms}
            platformsId={platformsId}
          />
        ))}
      </div>
    </div>
  );
};

export default PlatsormsList;
