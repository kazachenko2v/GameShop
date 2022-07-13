import React from "react";
import Calendar, { OnChangeDateRangeCallback } from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { setLocalStorage } from "../../utils/localStorage";
import { setDates } from "../../redux/filter/slice";
import { getFilter } from "../../redux/filter/selectors";

import "./calendar.css";
import styles from "./Dates.module.css";
import cn from "classnames";

const Dates: React.FC = () => {
  const dispatch = useDispatch();
  const { dates } = useSelector(getFilter);
  const dropDownRef = React.useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const value = dates.length ? dates.map((item) => new Date(item)) : null;

  const clickHandler = (value: [Date, Date]) => {
    // const arr = value.map((item: Date) => item.toISOString().split("T")[0]);

    const arr = value.map((item: Date) => {
      const offset = item.getTimezoneOffset();
      return new Date(item.getTime() - offset * 60 * 1000)
        .toISOString()
        .split("T")[0];
    });
    setLocalStorage("dates", arr);
    dispatch(setDates(arr));
    setIsActive(false);
  };

  React.useEffect(() => {
    const handleClickDateOutside = (event: MouseEvent) => {
      if (
        /* when you click outside of the dropdown menu */
        dropDownRef.current &&
        !event.composedPath().includes(dropDownRef.current)
      ) {
        setIsActive(false);
      }
    };
    document.body.addEventListener("click", handleClickDateOutside);
    return () =>
      document.body.removeEventListener("click", handleClickDateOutside);
  }, []);

  return (
    <div ref={dropDownRef} className={styles.container}>
      <button
        className={cn(styles.dropdown_button, {
          [styles.dropdown_button__not_acive]: !isActive,
          [styles.dropdown_button__active]: isActive,
        })}
        onClick={() => setIsActive(!isActive)}
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
          value={value as Date | [Date | null, Date | null] | null | undefined}
          onChange={clickHandler as OnChangeDateRangeCallback}
          selectRange={true}
          minDate={new Date(1981, 1, 1)}
        />
      </div>
    </div>
  );
};

export default Dates;
