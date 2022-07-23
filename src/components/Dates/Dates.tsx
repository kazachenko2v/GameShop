import React from "react";
import Calendar, { OnChangeDateRangeCallback } from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { setLocalStorage } from "../../utils/localStorage";
import { setDates } from "../../redux/filter/slice";
import { getFilter } from "../../redux/filter/selectors";

import { useClickOutside } from "../../hooks";
import {
  CalendarContext,
  ICalendarContextInterface,
} from "../../context/CalendarContext";
import { arraysComparing } from "../../utils/dropDown";
import { dateToString } from "../../utils/stringToDate";

import "./calendar.css";
import styles from "./Dates.module.css";
import cn from "classnames";

const Dates: React.FC<{
  isTablet: boolean;
}> = ({ isTablet }) => {
  const dispatch = useDispatch();
  const { dates } = useSelector(getFilter);
  const { calendar } = React.useContext(
    CalendarContext
  ) as ICalendarContextInterface;
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const selectedDates = React.useRef<string[] | null>(null);
  const startDates = React.useRef<string[] | null>(null);

  startDates.current = [...dates];

  selectedDates.current = calendar.value
    ? dateToString(calendar.value)
    : [...dates];

  const buttonOnClickHandler = () => {
    if (isActive) {
      compareArrays();
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const compareArrays = () => {
    const toUpdate = arraysComparing(
      startDates.current!,
      selectedDates.current!
    );
    if (toUpdate) {
      !isTablet && dispatch(setDates(toUpdate));
      setLocalStorage("dates", toUpdate);
    }
  };

  const clickHandler = (value: [Date, Date]) => {
    calendar.setValue(value);
  };
  const dropDownRef = useClickOutside(() => {
    compareArrays();
    setIsActive(false);
  });

  return (
    <div ref={dropDownRef} className={styles.container}>
      <button
        className={cn(styles.dropdown__button, {
          [styles.dropdown__button_not_acive]: !isActive,
          [styles.dropdown__button_active]: isActive,
        })}
        onClick={buttonOnClickHandler}
      >
        <span>Dates</span>
        <span
          className={cn(styles.arrow, { [styles.arrow_acive]: isActive })}
        ></span>
      </button>
      <div
        className={cn(styles.dropdown__menu, {
          [styles.dropdown__menu_deactive]: !isActive,
          [styles.dropdown__menu_active]: isActive,
        })}
      >
        <Calendar
          value={
            calendar.value as
              | Date
              | [Date | null, Date | null]
              | null
              | undefined
          }
          onChange={clickHandler as OnChangeDateRangeCallback}
          selectRange={true}
          minDate={new Date(1981, 1, 1)}
        />
      </div>
    </div>
  );
};

export default Dates;
