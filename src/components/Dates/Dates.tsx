import React from "react";
import Calendar, { OnChangeDateRangeCallback } from "react-calendar";
import { useDispatch } from "react-redux";
import { setLocalStorage } from "../../utils/localStorage";

import { DropDown } from "../UI";
import { useClickOutside } from "../../hooks/useClickOutside";
import { TFilterContext } from "../../contexts/FilterContext/FilterContext";
import { isEqual } from "../../utils/arraysComparing";
import { arrDateToString } from "../../utils/stringToDate";

import "./calendar.css";
import { useMediaQuery } from "react-responsive";
import { TABLET } from "../../constants";
import { DatesListProps } from "../types";
import { setCurrentPage } from "../../redux/filter/slice";

const Dates: React.FC<DatesListProps> = ({
  startItems,
  selectedItems,
  setItemsIdtoState,
  setItemsIdToContext,
  value,
}) => {
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ maxWidth: TABLET });
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const selectedDates = React.useRef<string[] | null>(null);
  const startDates = React.useRef<string[] | null>(null);
  startDates.current = [...startItems];
  selectedDates.current = selectedItems
    ? arrDateToString(selectedItems)
    : [...startItems];

  const onButtonClickHandler = () => {
    if (isActive) {
      compareArrays();
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const compareArrays = () => {
    if (!isEqual(startDates.current!, selectedDates.current!)) {
      !isTablet && dispatch(setItemsIdtoState(selectedDates.current!));
      dispatch(setCurrentPage(1));
      setLocalStorage("dates", selectedDates.current!);
    }
  };

  const clickHandler = (value: [Date, Date]) => {
    setItemsIdToContext((prevState: TFilterContext) => {
      return { ...prevState, datesContext: value };
    });
  };

  const dropDownRef = useClickOutside(() => {
    compareArrays();
    setIsActive(false);
  });

  return (
    <DropDown
      value={value}
      isActive={isActive}
      dropDownRef={dropDownRef}
      onButtonClickHandler={onButtonClickHandler}
    >
      <Calendar
        value={
          selectedItems as Date | [Date | null, Date | null] | null | undefined
        }
        onChange={clickHandler as OnChangeDateRangeCallback}
        selectRange={true}
        minDate={new Date(1981, 1, 1)}
      />
    </DropDown>
  );
};

export default Dates;
