import React, { Dispatch, SetStateAction } from "react";
import { TListId } from "../../redux/filter/types";

export interface IFilterContextInterface {
  calendar: TCalendar;
  Platforms: TList;
  Genres: TList;
  Tags: TList;
  setValue: Dispatch<SetStateAction<TFilterContext>>;
}

export type TFilterContext = {
  calendar: Date[] | null;
  Platforms: TListId;
  Genres: TListId;
  Tags: TListId;
};

export type TCalendar = {
  value: Date[] | null;
};

export type TList = {
  value: TListId;
};

export const FilterContext =
  React.createContext<IFilterContextInterface | null>(null);
