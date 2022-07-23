import React from "react";
import { useDispatch } from "react-redux";
import { ALL_PLATFORMS } from "../../constants";
import {
  setPlatformsId,
  setSearchQuery,
  setDates,
} from "../../redux/filter/slice";
import { SortProps } from "../types";

import {
  CalendarContext,
  ICalendarContextInterface,
} from "../../context/CalendarContext";

import styles from "./SortPanel.module.css";
import cn from "classnames";

const SortPanel: React.FC<SortProps> = ({ search, platformsId, dates }) => {
  const { calendar, pl } = React.useContext(
    CalendarContext
  ) as ICalendarContextInterface;
  const dispatch = useDispatch();
  const [platformsName, setPlatformsName] = React.useState<string[] | null>(
    null
  );

  const clearPlatforms = () => {
    pl.setPl([]);
    dispatch(setPlatformsId([]));
    localStorage.removeItem("platformsId");
  };

  const clearSearch = () => {
    dispatch(setSearchQuery(""));
    localStorage.removeItem("search");
  };

  const clearDates = () => {
    calendar.setValue(null);
    dispatch(setDates([]));
    localStorage.removeItem("dates");
  };

  const clearAll = () => {
    clearPlatforms();
    clearSearch();
    clearDates();
  };

  React.useEffect(() => {
    let platformsName: string[] = [];

    platformsId.forEach((id) =>
      ALL_PLATFORMS.forEach((pl) =>
        pl.id === id ? platformsName.push(pl.name) : null
      )
    );
    setPlatformsName(platformsName);
  }, [platformsId]);

  return (
    <div className={styles.container}>
      {platformsId.length > 0 && (
        <div
          className={cn(styles.item, styles.sort__item)}
          onClick={clearPlatforms}
        >
          <span>Platforms:</span>
          {platformsName &&
            platformsName.map((name) => <span key={name}>{name}</span>)}
          <button className={styles.button_remove}></button>
        </div>
      )}
      {search && (
        <div
          className={cn(styles.item, styles.sort__item)}
          onClick={clearSearch}
        >
          <span>Search:</span>
          <span>{search}</span>
          <button className={styles.button_remove}></button>
        </div>
      )}

      {dates.length > 0 && (
        <div
          className={cn(styles.item, styles.sort__item)}
          onClick={clearDates}
        >
          <span>Dates:</span>
          {dates.map((item) => (
            <span key={item}>{item}</span>
          ))}
          <button className={styles.button_remove}></button>
        </div>
      )}

      {(platformsId.length > 0 || search || dates.length > 0) && (
        <button className={styles.item} onClick={clearAll}>
          ClearAll
        </button>
      )}
    </div>
  );
};

export default SortPanel;
