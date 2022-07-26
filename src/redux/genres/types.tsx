export type TGenresItem = {
  id: number;
  name: string;
};

export interface IGenresSliceState {
  results: TGenresItem[];
  status: string;
}

export enum Status {
  LOADING = "loading",
  READY = "ready",
  ERROR = "error",
}
