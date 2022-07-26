import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALL_PLATFORMS } from "../../constants";
import {
  setPlatformsId,
  setSearchQuery,
  setDates,
  setGenresId,
} from "../../redux/filter/slice";
import { getGenres } from "../../redux/genres/selectors";
import { SortProps } from "../types";

import {
  FilterContext,
  IFilterContextInterface,
} from "../../contexts/FilterContext/FilterContext";

import styles from "./SortPanel.module.css";
import cn from "classnames";

const SortPanel: React.FC<SortProps> = ({
  search,
  platformsId,
  genresId,
  dates,
}) => {
  const dispatch = useDispatch();
  const { results: allGenres } = useSelector(getGenres);
  const { setValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;
  const [platformsName, setPlatformsName] = React.useState<string[] | null>(
    null
  );
  const [genresName, setGenresName] = React.useState<string[] | null>(null);

  const clearPlatforms = () => {
    setValue((prevState) => {
      return { ...prevState, platforms: [] };
    });
    dispatch(setPlatformsId([]));
    localStorage.removeItem("platformsId");
  };

  const clearGenres = () => {
    setValue((prevState) => {
      return { ...prevState, selectedGenres: [] };
    });
    dispatch(setGenresId([]));
    localStorage.removeItem("genresId");
  };

  const clearSearch = () => {
    dispatch(setSearchQuery(""));
    localStorage.removeItem("search");
  };

  const clearDates = () => {
    setValue((prevState) => {
      return { ...prevState, calendar: null };
    });
    dispatch(setDates([]));
    localStorage.removeItem("dates");
  };

  const clearAll = () => {
    clearPlatforms();
    clearGenres();
    clearSearch();
    clearDates();
  };

  React.useEffect(() => {
    let platformsName: string[] = [];
    let genresName: string[] = [];

    platformsId.forEach((id) =>
      ALL_PLATFORMS.forEach((pl) =>
        pl.id === id ? platformsName.push(pl.name) : null
      )
    );
    genresId.forEach((id) =>
      allGenres.forEach((pl) =>
        pl.id === id ? genresName.push(pl.name) : null
      )
    );

    setPlatformsName(platformsName);
    setGenresName(genresName);
  }, [platformsId, genresId]);

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
        search ||
        dates.length > 0) && (
        <button className={styles.item} onClick={clearAll}>
          ClearAll
        </button>
      )}
    </div>
  );
};

export default SortPanel;
