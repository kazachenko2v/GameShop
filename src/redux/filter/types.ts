export interface IFilterSliceState {
  page: number;
  platformsId: TPlatformsId;
  search: string;
}

export type TPlatformsId = number[];

export type TSearchParams = {
  page: string;
  parent_platforms: string;
  search: string;
};
