import React from "react";
import { useDispatch } from "react-redux";
import { ALL_PLATFORMS, ALL_PLATFORMS_ID } from "../../constants";
import {
  setPlatformsId,
  setSearchQuery,
  setDates,
} from "../../redux/filter/slice";
import { TPlatformsId } from "../../redux/filter/types";
import styles from "./SortPanel.module.css";
import cn from "classnames";

type SortPanelProps = {
  search: string;
  platformsId: TPlatformsId;
  dates: string[];
};

const SortPanel: React.FC<SortPanelProps> = ({
  search,
  platformsId,
  dates,
}) => {
  const [platformsName, setPlatformsName] = React.useState<string[] | null>(
    null
  );
  const dispatch = useDispatch();

  const clearPlatforms = () => {
    dispatch(setPlatformsId(ALL_PLATFORMS_ID));
    localStorage.removeItem("platformsId");
  };

  const clearSearch = () => {
    dispatch(setSearchQuery(""));
    localStorage.removeItem("search");
  };

  const clearDates = () => {
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

  return search ||
    dates.length ||
    !(JSON.stringify(platformsId) === JSON.stringify(ALL_PLATFORMS_ID)) ? (
    <div className={styles.container}>
      {!(JSON.stringify(platformsId) === JSON.stringify(ALL_PLATFORMS_ID)) && (
        <div className={cn(styles.item, styles.sort__item)}>
          <span>Platforms:</span>
          {platformsName &&
            platformsName.map((name) => <span key={name}>{name}</span>)}
          <button
            className={styles.button_remove}
            onClick={clearPlatforms}
          ></button>
        </div>
      )}
      {search && (
        <div className={cn(styles.item, styles.sort__item)}>
          <span>Search:</span>
          <span>{search}</span>
          <button
            className={styles.button_remove}
            onClick={clearSearch}
          ></button>
        </div>
      )}

      {dates.length > 0 && (
        <div className={cn(styles.item, styles.sort__item)}>
          <span>Dates:</span>
          {dates.map((item) => (
            <span key={item}>{item}</span>
          ))}
          <button
            className={styles.button_remove}
            onClick={clearDates}
          ></button>
        </div>
      )}

      <button className={styles.item} onClick={clearAll}>
        ClearAll
      </button>
    </div>
  ) : null;
};

export default SortPanel;
