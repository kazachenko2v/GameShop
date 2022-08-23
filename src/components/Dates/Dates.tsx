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
import { arrDateToString } from "../../utils/stringToDate";

import "./calendar.css";
import { useMediaQuery } from "react-responsive";
import { TABLET } from "../../constants";

const Dates: React.FC = () => {
  const dispatch = useDispatch();

  const isTablet = useMediaQuery({ maxWidth: TABLET });

  const { dates } = useSelector(getFilter);
  const { datesContext, setContextValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;
  const [isActive, setIsActive] = React.useState<boolean>(false);

  const selectedDates = React.useRef<string[] | null>(null);
  const startDates = React.useRef<string[] | null>(null);

  startDates.current = [...dates];
  selectedDates.current = datesContext.value
    ? arrDateToString(datesContext.value)
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
    setContextValue((prevState) => {
      return { ...prevState, datesContext: value };
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
          datesContext.value as
            | Date
            | [Date | null, Date | null]
            | null
            | undefined
        }
        onChange={clickHandler as OnChangeDateRangeCallback}
        selectRange={true}
        minDate={new Date(1981, 1, 1)}
      />
    </DropDown>
  );
};

export default Dates;
