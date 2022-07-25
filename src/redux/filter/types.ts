export interface IFilterSliceState {
  page: number;
  platformsId: TListId;
  genresId: TListId;
  search: string;
  dates: string[];
}

export type TListId = number[];
