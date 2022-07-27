import React, { Dispatch, SetStateAction } from "react";

export interface IFilterContextInterface {
  calendar: TFilter;
  platforms: TList;
  selectedGenres: TList;
  selectedTags: TList;

  setValue: Dispatch<
    SetStateAction<{
      calendar: Date[] | null;
      platforms: number[];
      selectedGenres: number[];
      selectedTags: number[];
    }>
  >;
}

export type TFilter = {
  value: Date[] | null;
};

export type TList = {
  value: number[];
};

export const FilterContext =
  React.createContext<IFilterContextInterface | null>(null);
