export interface IFilterSliceState {
  page: number;
  search: string;
  platformsId: TListId;
  genresId: TListId;
  tagsId: TListId;
  dates: string[];
}

export type TListId = number[];
