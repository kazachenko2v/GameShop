import React from "react";
import { useMediaQuery } from "react-responsive";
import { CSSTransition } from "react-transition-group";
import { PlatformsList, Dates, MenuMobile } from "../";

import Filter from "../../assets/images/filter.svg";

import styles from "./SortContainer.module.css";
import { setFilters } from "../../redux/filter/slice";
import { useDispatch } from "react-redux";
import {
  CalendarContext,
  ICalendarContextInterface,
} from "../../context/CalendarContext";
import { dateToString } from "../../utils/stringToDate";
import { useActiveFiltersCount } from "../../hooks";
import { IFilterSliceState } from "../../redux/filter/types";

const SortContainer: React.FC<IFilterSliceState> = ({
  page,
  search,
  platformsId,
  dates,
}) => {
  const { calendar, pl } = React.useContext(
    CalendarContext
  ) as ICalendarContextInterface;
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ maxWidth: 912 });

  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);

  const acceptHandler = () => {
    setIsOpenMenu(false);
    dispatch(
      setFilters({
        page: page,
        platformsId: pl.pl,
        search: search,
        dates: dateToString(calendar.value!),
      })
    );
  };

  const clearAll = () => {
    setIsOpenMenu(false);
    calendar.setValue(null);
    pl.setPl([]);
    dispatch(
      setFilters({
        page: page,
        platformsId: [],
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
      <MenuMobile isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu}>
        <div className={styles.menu}>
          <ul className={styles.list__mobile}>
            <li className={styles.item}>
              <PlatformsList isTablet={isTablet} />
            </li>
            <li className={styles.item}>
              <Dates isTablet={isTablet} />
            </li>
          </ul>
          <button onClick={acceptHandler}>Accept</button>
          <button onClick={clearAll}>Clear</button>
        </div>
      </MenuMobile>
    </div>
  ) : (
    <ul className={styles.container}>
      <li className={styles.item}>
        <PlatformsList isTablet={isTablet} />
      </li>
      <li className={styles.item}>
        <Dates isTablet={isTablet} />
      </li>
    </ul>
  );
};

export default SortContainer;
