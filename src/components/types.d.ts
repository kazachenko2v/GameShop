export type MenuMobileProps = {
  isOpenMenu: boolean;
  setIsOpenMenu: (arg: boolean) => void;
  handleClickOnLink: (arg: string) => void;
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
  search: string;
  platformsId: number[];
  dates: string[];
};

export type SortProps = {
  search: string;
  platformsId: number[];
  dates: string[];
};
