import React from "react";
import { TListId } from "../redux/filter/types";
import { IGame } from "../redux/games/types";
import { TFilterContext } from "../contexts/FilterContext";
import { GamesResult } from "../../redux/games/types";

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
  startItems: TListId;
  selectedItems: ListId;
  setItemsIdtoState: React.SetStateAction<S>;
  value: string;
  allItemConstant: {
    id: number;
    name: string;
  }[];
};

export type SortProps = {
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
  currentUser: any | null;
  setIsOpenMenu: (isActive: boolean) => void;
  handleClickOnLink: (arg: string) => void;
};

export type SeacrhProp = {
  setIsOpenMenu: (isActive: boolean) => void;
};

export type GamesListProp = {
  games: GamesResult;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};
