import React from "react";
import Calendar, { OnChangeDateRangeCallback } from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { setLocalStorage } from "../../utils/localStorage";
import { setDates } from "../../redux/filter/slice";
import { getFilter } from "../../redux/filter/selectors";

import { DropDown } from "../";
import { useClickOutside } from "../../hooks/useClickOutside";
import {
  FilterContext,
  IFilterContextInterface,
} from "../../contexts/FilterContext/FilterContext";
import { arraysComparing } from "../../utils/dropdown";
import { dateToString } from "../../utils/stringToDate";

import "./calendar.css";

const Dates: React.FC<{
  isTablet: boolean;
}> = ({ isTablet }) => {
  const dispatch = useDispatch();
  const { dates } = useSelector(getFilter);
  const { calendar, setValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;
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
    setValue((prevState) => {
      return { ...prevState, calendar: value };
    });
  };
  const dropDownRef = useClickOutside(() => {
    compareArrays();
    setIsActive(false);
  });

  return (
    <DropDown
      value={"Dates"}
      isActive={isActive}
      dropDownRef={dropDownRef}
      buttonOnClickHandler={buttonOnClickHandler}
    >
      <Calendar
        value={
          calendar.value as Date | [Date | null, Date | null] | null | undefined
        }
        onChange={clickHandler as OnChangeDateRangeCallback}
        selectRange={true}
        minDate={new Date(1981, 1, 1)}
      />
    </DropDown>
  );
};

export default Dates;
