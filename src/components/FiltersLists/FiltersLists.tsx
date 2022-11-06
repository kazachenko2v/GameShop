import React from "react";
import { useSelector } from "react-redux";

import {
  FilterContext,
  IFilterContextInterface,
} from "../../contexts/FilterContext/FilterContext";
import { getFilter } from "../../redux/filter/selectors";
import {
  setPlatformsId,
  setGenresId,
  setTagsId,
  setDates,
} from "../../redux/filter/slice";

import { Dates, DropdownList } from "..";
import { Search } from "../UI";
import { ALL_PLATFORMS, ALL_GENRES, ALL_TAGS } from "../../constants";

import styles from "./FiltersLists.module.css";
import cn from "classnames";

const FiltersLists: React.FC = () => {
  const { platformsId, genresId, tagsId, dates } = useSelector(getFilter);

  const {
    tagsContext,
    genresContext,
    platformsContext,
    datesContext,
    setContextValue,
  } = React.useContext(FilterContext) as IFilterContextInterface;

  const filtersLists = [
    {
      startItems: platformsId,
      selectedItems: platformsContext.value,
      setItemsIdtoState: setPlatformsId,
      setItemsIdToContext: setContextValue,
      value: "platforms",
      allItemConstant: ALL_PLATFORMS,
    },
    {
      startItems: genresId,
      selectedItems: genresContext.value,
      setItemsIdtoState: setGenresId,
      setItemsIdToContext: setContextValue,
      value: "genres",
      allItemConstant: ALL_GENRES,
    },
    {
      startItems: tagsId,
      selectedItems: tagsContext.value,
      setItemsIdtoState: setTagsId,
      setItemsIdToContext: setContextValue,
      value: "tags",
      allItemConstant: ALL_TAGS,
    },
  ];

  return (
    <ul className={styles.container}>
      <li className={cn(styles.item, styles.item__search)}>
        <Search />
      </li>
      {filtersLists.map((item) => (
        <li key={item.value} className={styles.item}>
          <DropdownList
            startItems={item.startItems}
            selectedItems={item.selectedItems}
            setItemsIdtoState={item.setItemsIdtoState}
            setItemsIdToContext={item.setItemsIdToContext}
            value={item.value}
            allItemConstant={item.allItemConstant}
          />
        </li>
      ))}
      <li className={styles.item}>
        <Dates
          startItems={dates}
          selectedItems={datesContext.value}
          setItemsIdtoState={setDates}
          setItemsIdToContext={setContextValue}
          value={"dates"}
        />
      </li>
    </ul>
  );
};

export default FiltersLists;
