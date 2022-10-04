import React from "react";
import { TListId } from "../redux/filter/types";
import { IGame } from "../redux/games/types";
import { TFilterContext } from "../contexts/FilterContext";
import { GamesResult } from "../../redux/games/types";
import { DocumentData } from "firebase/firestore";

export type ModalFormProps = {
  newValue: string;
  value: string;
  setNewValue: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  acceptHandler: () => void;
};

export type ModalProps = {
  children: React.ReactNode;
  newValue: string;
  error: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  acceptHandler: () => void;
};

export type MoneyCountProps = {
  isOpenModal: boolean;
  setIsOpenModal: (arg: boolean) => void;
};

export type MobileDropDownMenuProps = {
  children: React.ReactNode;
  isOpenMenu: boolean;
  setIsOpenMenu: (isActive: boolean) => void;
};

export type IdItemProps = {
  id: number;
  value?: string;
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
  selectedItems: TListId;
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
  currentUser: DocumentData | null;
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
