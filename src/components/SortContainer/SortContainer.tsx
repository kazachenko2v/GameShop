import React from "react";
import { useMediaQuery } from "react-responsive";
import { CSSTransition } from "react-transition-group";
import { PlatformsList, Dates } from "../";
import { SortProps } from "../types";

import Filter from "../../assets/images/filter.svg";

import styles from "./SortContainer.module.css";
import { setDates, setFilters, setPlatformsId } from "../../redux/filter/slice";
import { useDispatch, useSelector } from "react-redux";
import { getFilter } from "../../redux/filter/selectors";
import {
  CalendarContext,
  ICalendarContextInterface,
} from "../../context/CalendarContext";
import { dateToString } from "../../utils/stringToDate";
import { useActiveFiltersCount } from "../../hooks";

const SortContainer: React.FC<SortProps> = ({ search, platformsId, dates }) => {
  const { calendar, pl } = React.useContext(
    CalendarContext
  ) as ICalendarContextInterface;
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ maxWidth: 912 });
  const { page } = useSelector(getFilter);

  const [isOpenMenu, setOpenMenu] = React.useState<boolean>(false);

  const acceptHandler = () => {
    dispatch(
      setFilters({
        page: page,
        platformsId: pl.pl,
        search: "",
        dates: dateToString(calendar.value!),
      })
    );
  };

  const clearAll = () => {
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
      <div onClick={() => setOpenMenu(!isOpenMenu)}>
        <button>Filters</button>
        <img className={styles.icon} src={Filter} alt="Filter" />
        <span>{activeFiltersCount.length}</span>
      </div>
      <CSSTransition
        in={isOpenMenu}
        timeout={200}
        classNames={{
          enterActive: styles.container__mobile_enter,
          enterDone: styles.container__mobile_enter_active,
          exitActive: styles.container__mobile_exit,
          exitDone: styles.container__mobile_exit_active,
        }}
      >
        <div className={styles.container__mobile}>
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
      </CSSTransition>
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
