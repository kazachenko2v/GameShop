import React from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { setFilters } from "../../redux/filter/slice";
import { IFilterSliceState } from "../../redux/filter/types";

import {
  FilterContext,
  IFilterContextInterface,
} from "../../contexts/FilterContext/FilterContext";
import { dateToString } from "../../utils/stringToDate";
import { useActiveFiltersCount } from "../../hooks";
import { PlatformsList, Dates, MobileDropDownMenu, GenresList } from "../";
import Filter from "../../assets/images/filter.svg";

import styles from "./SortContainer.module.css";
import cn from "classnames";

const SortContainer: React.FC<IFilterSliceState> = ({
  page,
  search,
  platformsId,
  genresId,
  dates,
}) => {
  const { calendar, selectedGenres, platforms, setValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ maxWidth: 912 });

  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);

  const acceptHandler = () => {
    setIsOpenMenu(false);
    dispatch(
      setFilters({
        page: page,
        platformsId: platforms.value,
        genresId: selectedGenres.value,
        search: search,
        dates: calendar.value ? dateToString(calendar.value) : [],
      })
    );
  };

  const clearAll = () => {
    setIsOpenMenu(false);
    setValue((prevState) => {
      return { ...prevState, calendar: null };
    });
    setValue((prevState) => {
      return { ...prevState, platforms: [] };
    });
    setValue((prevState) => {
      return { ...prevState, selectedGenres: [] };
    });
    dispatch(
      setFilters({
        page: page,
        platformsId: [],
        genresId: [],
        search: "",
        dates: [],
      })
    );
  };

  const activeFiltersCount = useActiveFiltersCount([
    search,
    platformsId,
    dates,
  ]);

  return isTablet ? (
    <div className={styles.container}>
      <div onClick={() => setIsOpenMenu(!isOpenMenu)}>
        <button>Filters</button>
        <img className={styles.icon} src={Filter} alt="Filter" />
        <span>{activeFiltersCount.length}</span>
      </div>
      <MobileDropDownMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu}>
        <div className={styles.menu}>
          <ul className={styles.list_mobile}>
            <li className={styles.item}>
              <PlatformsList isTablet={isTablet} />
            </li>
            <li className={styles.item}>
              <GenresList isTablet={isTablet} />
            </li>
            <li className={styles.item}>
              <Dates isTablet={isTablet} />
            </li>
          </ul>
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
    </div>
  ) : (
    <ul className={styles.container}>
      <li className={styles.item}>
        <PlatformsList isTablet={isTablet} />
      </li>
      <li className={styles.item}>
        <GenresList isTablet={isTablet} />
      </li>
      <li className={styles.item}>
        <Dates isTablet={isTablet} />
      </li>
    </ul>
  );
};

export default SortContainer;
