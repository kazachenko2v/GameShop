import React, { Dispatch, SetStateAction } from "react";
import { TListId } from "../../redux/filter/types";

export interface IFilterContextInterface {
  searchContext: { value: string };
  datesContext: TCalendar;
  platformsContext: TList;
  genresContext: TList;
  tagsContext: TList;
  setContextValue: Dispatch<SetStateAction<TFilterContext>>;
}

export type TFilterContext = {
  searchContext: string;
  datesContext: Date[] | null;
  platformsContext: TListId;
  genresContext: TListId;
  tagsContext: TListId;
};

export type TCalendar = {
  value: Date[] | null;
};

export type TList = {
  value: TListId;
};

export const FilterContext =
  React.createContext<IFilterContextInterface | null>(null);
