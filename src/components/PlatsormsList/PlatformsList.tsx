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
        <span
          className={cn(styles.arrow, { [styles.arrow_acive]: isActive })}
        ></span>
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
