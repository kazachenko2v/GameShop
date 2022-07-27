export interface IFilterSliceState {
  page: number;
  platformsId: TListId;
  genresId: TListId;
  tagsId: TListId;
  search: string;
  dates: string[];
}

export type TListId = number[];
