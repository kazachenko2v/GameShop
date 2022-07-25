export type MenuMobileProps = {
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
  dates: string[];
};
