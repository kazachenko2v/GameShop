import React, { Dispatch, SetStateAction } from "react";

export interface ICalendarContextInterface {
  calendar: TCalendar;
  pl: TPl;
}

export type TCalendar = {
  value: Date[] | null;
  setValue: Dispatch<SetStateAction<Date[] | null>>;
};

export type TPl = {
  pl: number[];
  setPl: (arg: any) => void;
};

export const CalendarContext =
  React.createContext<ICalendarContextInterface | null>(null);
