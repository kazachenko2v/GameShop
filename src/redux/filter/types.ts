export interface IFilterSliceState {
  page: number;
  platformsId: TPlatformsId;
  search: string;
  dates: string[];
}

export type TPlatformsId = number[];
