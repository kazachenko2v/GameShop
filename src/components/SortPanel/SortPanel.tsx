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
          <button onClick={clearPlatforms}>
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.745 1.24028C7.99902 0.986258 7.99902 0.574402 7.745 0.320377C7.49097 0.066352 7.07912 0.066352 6.82509 0.320377L4.06538 3.08009L1.24028 0.255001C0.986258 0.000975884 0.574402 0.000975463 0.320377 0.255001C0.0663521 0.509026 0.0663527 0.920881 0.320377 1.17491L3.14547 4L0.320377 6.82509C0.0663514 7.07912 0.0663514 7.49097 0.320376 7.745C0.574401 7.99902 0.986258 7.99902 1.24028 7.745L4.06537 4.9199L6.82509 7.67962C7.07912 7.93365 7.49097 7.93365 7.745 7.67962C7.99902 7.4256 7.99902 7.01374 7.745 6.75972L4.98528 4L7.745 1.24028Z"
                fill="#91969B"
              />
            </svg>
          </button>
        </div>
      )}
      {search && (
        <div className={cn(styles.item, styles.sort__item)}>
          <span>Search:</span>
          <span>{search}</span>
          <button onClick={clearSearch}>
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.745 1.24028C7.99902 0.986258 7.99902 0.574402 7.745 0.320377C7.49097 0.066352 7.07912 0.066352 6.82509 0.320377L4.06538 3.08009L1.24028 0.255001C0.986258 0.000975884 0.574402 0.000975463 0.320377 0.255001C0.0663521 0.509026 0.0663527 0.920881 0.320377 1.17491L3.14547 4L0.320377 6.82509C0.0663514 7.07912 0.0663514 7.49097 0.320376 7.745C0.574401 7.99902 0.986258 7.99902 1.24028 7.745L4.06537 4.9199L6.82509 7.67962C7.07912 7.93365 7.49097 7.93365 7.745 7.67962C7.99902 7.4256 7.99902 7.01374 7.745 6.75972L4.98528 4L7.745 1.24028Z"
                fill="#91969B"
              />
            </svg>
          </button>
        </div>
      )}

      {dates.length > 0 && (
        <div className={cn(styles.item, styles.sort__item)}>
          <span>Dates:</span>
          {dates.map((item) => (
            <span key={item}>{item}</span>
          ))}
          <button onClick={clearDates}>
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.745 1.24028C7.99902 0.986258 7.99902 0.574402 7.745 0.320377C7.49097 0.066352 7.07912 0.066352 6.82509 0.320377L4.06538 3.08009L1.24028 0.255001C0.986258 0.000975884 0.574402 0.000975463 0.320377 0.255001C0.0663521 0.509026 0.0663527 0.920881 0.320377 1.17491L3.14547 4L0.320377 6.82509C0.0663514 7.07912 0.0663514 7.49097 0.320376 7.745C0.574401 7.99902 0.986258 7.99902 1.24028 7.745L4.06537 4.9199L6.82509 7.67962C7.07912 7.93365 7.49097 7.93365 7.745 7.67962C7.99902 7.4256 7.99902 7.01374 7.745 6.75972L4.98528 4L7.745 1.24028Z"
                fill="#91969B"
              />
            </svg>
          </button>
        </div>
      )}

      <button className={styles.item} onClick={clearAll}>
        ClearAll
      </button>
    </div>
  ) : null;
};

export default SortPanel;
