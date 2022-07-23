import React from "react";
import { useSelector } from "react-redux";
import { getFilter } from "../redux/filter/selectors";
import { CalendarContext } from "./CalendarContext";

interface ICalendarContextProvider {
  children: React.ReactNode;
}

const CalendarContextProvider: React.FC<ICalendarContextProvider> = ({
  children,
}) => {
  const { dates, platformsId } = useSelector(getFilter);

  const [value, setValue] = React.useState<Date[] | null>(
    dates.length ? dates.map((item) => new Date(item)) : null
  );

  const [pl, setPl] = React.useState<number[]>([...platformsId]);

  return (
    <CalendarContext.Provider
      value={{ calendar: { value, setValue }, pl: { pl, setPl } }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarContextProvider;
