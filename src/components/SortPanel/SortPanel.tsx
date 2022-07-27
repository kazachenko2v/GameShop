import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ALL_PLATFORMS } from "../../constants";
import {
  setPlatformsId,
  setSearchQuery,
  setDates,
  setGenresId,
  setTagsId,
} from "../../redux/filter/slice";
import { getGenres } from "../../redux/genres/selectors";
import { useGetTagsQuery } from "../../redux/filtes.api";
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
  tagsId,
  dates,
}) => {
  const dispatch = useDispatch();
  const { results: allGenres, status } = useSelector(getGenres);
  const { data: allTags, isSuccess } = useGetTagsQuery();
  const { setValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;
  const [platformsName, setPlatformsName] = React.useState<string[] | null>(
    null
  );
  const [genresName, setGenresName] = React.useState<string[] | null>(null);
  const [tagsName, setTagsName] = React.useState<string[] | null>(null);

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

  const clearTags = () => {
    setValue((prevState) => {
      return { ...prevState, selectedTags: [] };
    });
    dispatch(setTagsId([]));
    localStorage.removeItem("tagsId");
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
      allGenres.forEach((item) =>
        item.id === id ? genresName.push(item.name) : null
      )
    );
    tagsId.forEach(
      (id) =>
        isSuccess &&
        allTags.forEach((item) =>
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

export default SortPanel;
