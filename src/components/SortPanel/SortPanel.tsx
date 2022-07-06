import React from "react";
import { useDispatch } from "react-redux";
import { ALL_PLATFORMS, ALL_PLATFORMS_ID } from "../../constants";
import { setPlatformsId, setSearchQuery } from "../../redux/filter/slice";
import { TPlatformsId } from "../../redux/filter/types";
import SortCloseButton from "../../assets/images/sort_close_button.svg";
import styles from "./SortPanel.module.css";
import cn from "classnames";

type SortPanelProps = {
  search: string;
  platformsId: TPlatformsId;
};

const SortPanel: React.FC<SortPanelProps> = ({ search, platformsId }) => {
  const [platformsName, setPlatformsName] = React.useState<string[] | null>(
    null
  );
  const dispatch = useDispatch();
  const clearPlatforms = () => {
    dispatch(setPlatformsId(ALL_PLATFORMS_ID));
  };

  const clearSearch = () => {
    dispatch(setSearchQuery(""));
  };

  const clearall = () => {
    dispatch(setSearchQuery(""));
    dispatch(setPlatformsId(ALL_PLATFORMS_ID));
  };

  React.useEffect(() => {
    let platformsName: string[] = [];

    platformsId.forEach((id) =>
      ALL_PLATFORMS.forEach((pl) =>
        pl.id === id ? platformsName.push(pl.name) : null
      )
    );
    setPlatformsName(platformsName);
  }, []);

  return search ||
    !(JSON.stringify(platformsId) === JSON.stringify(ALL_PLATFORMS_ID)) ? (
    <div className={styles.container}>
      {!(JSON.stringify(platformsId) === JSON.stringify(ALL_PLATFORMS_ID)) && (
        <div className={cn(styles.item, styles.sort__item)}>
          <span>Platforms:</span>
          {platformsName &&
            platformsName.map((name) => <span key={name}>{name}</span>)}
          <button onClick={clearPlatforms}>
            <img src={SortCloseButton} alt="Remove" />
          </button>
        </div>
      )}
      {search && (
        <div className={cn(styles.item, styles.sort__item)}>
          <span>Search:</span>
          <span>{search}</span>
          <button onClick={clearSearch}>
            <img src={SortCloseButton} alt="Remove" />
          </button>
        </div>
      )}

      <button className={styles.item} onClick={clearall}>
        ClearAll
      </button>
    </div>
  ) : null;
};

export default SortPanel;
