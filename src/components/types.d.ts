export type MobileDropDownMenuProps = {
  children: React.ReactNode;
  isOpenMenu: boolean;
  setIsOpenMenu: (isActive: boolean) => void;
};

export type FavoriteItemProps = {
  id: number;
};

export type PaginationProps = {
  currentPage: number;
  gamesCount: number;
  status: string;
};

export type PlatformsLIstItemProps = {
  item: {
    id: number;
    name: string;
  };
  isActiveMenu: boolean;
  togglePlatforms: (id: number) => void;
  platformsId: number[];
};

export type SortProps = {
  page?: number;
  search: string;
  platformsId: number[];
  genresId: number[];
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
