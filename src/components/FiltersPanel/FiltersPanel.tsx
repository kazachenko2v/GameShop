import React from "react";
import { useDispatch } from "react-redux";
import { ALL_PLATFORMS, ALL_TAGS, ALL_GENRES } from "../../constants";
import {
  setPlatformsId,
  setSearchQuery,
  setDates,
  setGenresId,
  setTagsId,
} from "../../redux/filter/slice";
import { FiltersPanelProps } from "../types";

import {
  FilterContext,
  IFilterContextInterface,
} from "../../contexts/FilterContext/FilterContext";

import styles from "./FiltersPanel.module.css";
import cn from "classnames";

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  search,
  platformsId,
  genresId,
  tagsId,
  dates,
}) => {
  const dispatch = useDispatch();
  const { setContextValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;
  const [platformsName, setPlatformsName] = React.useState<string[] | null>(
    null
  );
  const [genresName, setGenresName] = React.useState<string[] | null>(null);
  const [tagsName, setTagsName] = React.useState<string[] | null>(null);

  const clearPlatforms = () => {
    localStorage.removeItem("platforms");
    dispatch(setPlatformsId([]));
    setContextValue((prevState) => {
      return { ...prevState, platformsContext: [] };
    });
  };

  const clearGenres = () => {
    localStorage.removeItem("genres");
    dispatch(setGenresId([]));
    setContextValue((prevState) => {
      return { ...prevState, genresContext: [] };
    });
  };

  const clearTags = () => {
    localStorage.removeItem("tags");
    dispatch(setTagsId([]));
    setContextValue((prevState) => {
      return { ...prevState, tagsContext: [] };
    });
  };

  const clearSearch = () => {
    localStorage.removeItem("search");
    dispatch(setSearchQuery(""));
    setContextValue((prevState) => {
      return { ...prevState, searchContext: "" };
    });
  };

  const clearDates = () => {
    localStorage.removeItem("dates");
    dispatch(setDates([]));
    setContextValue((prevState) => {
      return { ...prevState, datesContext: null };
    });
  };

  const clearAll = () => {
    clearPlatforms();
    clearGenres();
    clearTags();
    clearSearch();
    clearDates();
  };

  React.useEffect(() => {
    let platformsName: string[] = [];
    let genresName: string[] = [];
    let tagsName: string[] = [];

    platformsId.forEach((id) =>
      ALL_PLATFORMS.forEach((item) =>
        item.id === id ? platformsName.push(item.name) : null
      )
    );
    genresId.forEach((id) =>
      ALL_GENRES.forEach((item) =>
        item.id === id ? genresName.push(item.name) : null
      )
    );
    tagsId.forEach((id) =>
      ALL_TAGS.forEach((item) =>
        item.id === id ? tagsName.push(item.name) : null
      )
    );

    setPlatformsName(platformsName);
    setGenresName(genresName);
    setTagsName(tagsName);
  }, [platformsId, genresId, tagsId]);

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
      {genresId.length > 0 && (
        <div
          className={cn(styles.item, styles.sort__item)}
          onClick={clearGenres}
        >
          <span>Genres:</span>
          {genresName &&
            genresName.map((name) => <span key={name}>{name}</span>)}
          <button className={styles.button_remove}></button>
        </div>
      )}
      {tagsId.length > 0 && (
        <div className={cn(styles.item, styles.sort__item)} onClick={clearTags}>
          <span>Tags:</span>
          {tagsName && tagsName.map((name) => <span key={name}>{name}</span>)}
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

      {(platformsId.length > 0 ||
        genresId.length > 0 ||
        tagsId.length > 0 ||
        search ||
        dates.length > 0) && (
        <button className={styles.item} onClick={clearAll}>
          ClearAll
        </button>
      )}
    </div>
  );
};

export default FiltersPanel;
