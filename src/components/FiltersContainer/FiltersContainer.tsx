import React from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { setFilters } from "../../redux/filter/slice";

import {
  FilterContext,
  IFilterContextInterface,
} from "../../contexts/FilterContext/FilterContext";
import { arrDateToString } from "../../utils/stringToDate";
import { useActiveFiltersCount } from "../../hooks/useActiveFiltersCount";
import { MobileDropDownMenu, FiltersLists } from "..";

import { TABLET } from "../../constants";

import Filter from "../../assets/images/filter.svg";
import Close from "../../assets/images/close.svg";
import styles from "./FiltersContainer.module.css";
import cn from "classnames";

const FiltersContainer: React.FC<{
  platformsId: number[];
  genresId: number[];
  tagsId: number[];
  search: string;
  dates: string[];
}> = ({ platformsId, genresId, tagsId, search, dates }) => {
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ maxWidth: TABLET });

  const {
    searchContext,
    datesContext,
    genresContext,
    tagsContext,
    platformsContext,
    setContextValue,
  } = React.useContext(FilterContext) as IFilterContextInterface;

  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);

  const acceptHandler = () => {
    setIsOpenMenu(false);
    dispatch(
      setFilters({
        page: 1,
        search: searchContext.value,
        platformsId: platformsContext.value,
        genresId: genresContext.value,
        tagsId: tagsContext.value,
        dates: datesContext.value ? arrDateToString(datesContext.value) : [],
      })
    );
  };

  const clearAll = () => {
    setIsOpenMenu(false);
    setContextValue((prevState) => {
      return { ...prevState, searchContext: "" };
    });
    setContextValue((prevState) => {
      return { ...prevState, datesContext: null };
    });
    setContextValue((prevState) => {
      return { ...prevState, platformsContext: [] };
    });
    setContextValue((prevState) => {
      return { ...prevState, genresContext: [] };
    });
    setContextValue((prevState) => {
      return { ...prevState, tagsContext: [] };
    });
    dispatch(
      setFilters({
        page: 1,
        platformsId: [],
        genresId: [],
        tagsId: [],
        search: "",
        dates: [],
      })
    );
  };

  const activeFiltersCountState = useActiveFiltersCount([
    platformsId,
    genresId,
    tagsId,
    search,
    dates,
  ]);

  const activeFiltersCountContext = useActiveFiltersCount([
    searchContext.value,
    datesContext.value,
    genresContext.value,
    tagsContext.value,
    platformsContext.value,
  ]);

  return isTablet ? (
    <>
      <div className={styles.container}>
        <button
          className={styles.button_main}
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          <img className={styles.icon} src={Filter} alt="Filter" />
          <span>
            Filters{" "}
            {activeFiltersCountState.length > 0
              ? activeFiltersCountState.length
              : ""}
          </span>
        </button>
      </div>
      <MobileDropDownMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu}>
        <div className={styles.menu}>
          <div className={styles.menu__header}>
            <span>
              Filters{" "}
              {activeFiltersCountContext.length > 0
                ? activeFiltersCountContext.length
                : ""}
            </span>
            <button onClick={() => setIsOpenMenu(false)}>
              <img src={Close} alt="Close" />
            </button>
          </div>
          <FiltersLists />
          <div className={styles.buttons__container}>
            <button className={styles.button} onClick={clearAll}>
              Clear
            </button>
            <button
              className={cn(styles.button, styles.button_accept)}
              onClick={acceptHandler}
            >
              Accept
            </button>
          </div>
        </div>
      </MobileDropDownMenu>
    </>
  ) : (
    <FiltersLists />
  );
};

export default FiltersContainer;
