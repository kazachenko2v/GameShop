import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TPlatformsId } from "../../redux/filter/types";
import { getFilter } from "../../redux/filter/selectors";
import { setPlatformsId } from "../../redux/filter/slice";

import { PlatformsListItem } from "../";
import { ALL_PLATFORMS } from "../../constants";
import { arraysComparing } from "../../utils/dropDown";
import { setLocalStorage } from "../../utils/localStorage";
import { useClickOutside } from "../../hooks";

import styles from "./PlatformsList.module.css";
import cn from "classnames";
import {
  CalendarContext,
  ICalendarContextInterface,
} from "../../context/CalendarContext";

const PlatsormsList: React.FC<{
  isTablet: boolean;
}> = ({ isTablet }) => {
  const dispatch = useDispatch();
  const { platformsId } = useSelector(getFilter);
  const { pl } = React.useContext(CalendarContext) as ICalendarContextInterface;
  const selectedPlatformsRef = React.useRef<TPlatformsId | null>(null);
  const startPlatformsRef = React.useRef<TPlatformsId | null>(null);
  selectedPlatformsRef.current = [...pl.pl];
  startPlatformsRef.current = [...platformsId];
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const sortAndCompareArrays = () => {
    const sortedSelectedPlatformsRef = selectedPlatformsRef.current!.sort(
      (a, b) => a - b
    );
    const toUpdate = arraysComparing(
      startPlatformsRef.current!,
      sortedSelectedPlatformsRef
    );
    if (toUpdate) {
      !isTablet ? dispatch(setPlatformsId(toUpdate)) : pl.setPl(toUpdate);
      setLocalStorage("platformsId", toUpdate);
    }
  };

  const buttonOnClickHandler = () => {
    if (isActive) {
      sortAndCompareArrays();
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const togglePlatforms = (id: number) => {
    if (pl.pl.includes(id)) {
      pl.setPl([...pl.pl].filter((item) => item !== id));
    } else if (!pl.pl.includes(id)) {
      const newArr: any = [];
      newArr.push(id);
      pl.setPl((prev: any) => prev.concat(newArr));
    }
  };

  const dropDownRef = useClickOutside(() => {
    sortAndCompareArrays();
    setIsActive(false);
  });

  return (
    <div ref={dropDownRef} className={styles.container}>
      <button
        className={cn(styles.dropdown__button, {
          [styles.dropdown__button_not_acive]: !isActive,
          [styles.dropdown__button_active]: isActive,
        })}
        onClick={buttonOnClickHandler}
      >
        <span>Platforms</span>
        <span
          className={cn(styles.arrow, { [styles.arrow_acive]: isActive })}
        ></span>
      </button>
      <div
        className={cn(styles.dropdown__menu, {
          [styles.dropdown__menu_active]: isActive,
        })}
      >
        {ALL_PLATFORMS.map((item) => (
          <PlatformsListItem
            key={item.id}
            item={item}
            isActiveMenu={isActive}
            togglePlatforms={togglePlatforms}
            platformsId={pl.pl}
          />
        ))}
      </div>
    </div>
  );
};

export default PlatsormsList;
