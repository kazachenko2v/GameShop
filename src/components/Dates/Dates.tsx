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

    console.log(arr);

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
        <svg
          className={cn(styles.arrow, { [styles.arrow_acive]: isActive })}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.528758 0.528575C0.268409 0.788925 0.268409 1.21103 0.528758 1.47138L4.52876 5.47138C4.78911 5.73173 5.21122 5.73173 5.47157 5.47138L9.47157 1.47138C9.73192 1.21104 9.73192 0.788925 9.47157 0.528576C9.21122 0.268226 8.78911 0.268226 8.52876 0.528576L5.00016 4.05717L1.47157 0.528575C1.21122 0.268226 0.789108 0.268226 0.528758 0.528575Z"
            fill="black"
          />
        </svg>
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
