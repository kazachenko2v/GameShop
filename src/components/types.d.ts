import React from "react";
import { TListId } from "../redux/filter/types";
import { IGame } from "../redux/games/types";
import { TFilterContext } from "../contexts/FilterContext";

export type MobileDropDownMenuProps = {
  children: React.ReactNode;
  isOpenMenu: boolean;
  setIsOpenMenu: (isActive: boolean) => void;
};

export type FavoriteItemProps = {
  id: number;
};

export type GameCardProps = {
  item: IGame;
};

export type PaginationProps = {
  currentPage: number;
  gamesCount: number;
  isSuccess: boolean;
};

export type DropdownListItemProps = {
  item: {
    id: number;
    name: string;
  };
  isActiveMenu: boolean;
  toggleItems: (id: number) => void;
  itemsId: TListId;
};

export type DropdownListProps = {
  isTablet: boolean;
  startItems: TListId;
  selectedItems: TListId;
  setValue: React.Dispatch<React.SetStateAction<TFilterContext>>;
  setItemsIdtoState: React.SetStateAction<S>;
  value: string;
  allItemConstant: {
    id: number;
    name: string;
  }[];
};

export type SortProps = {
  page?: number;
  search: string;
  platformsId: TListId;
  genresId: TListId;
  tagsId: TListId;
  dates: string[];
};

export type DropDownProps = {
  children: React.ReactNode;
  value: string;
  isActive: boolean;
  dropDownRef: React.RefObject<HTMLDivElement>;
  buttonOnClickHandler: () => void;
};

export type HeaderMenuProps = {
  setIsOpenMenu: (isActive: boolean) => void;
  handleClickOnLink: (arg: string) => void;
};

export type SeacrhProp = {
  setIsOpenMenu: (isActive: boolean) => void;
};
