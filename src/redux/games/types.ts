export type TGamesItem = {
  id: number;
  background_image: string;
  name: string;
  parent_platforms: [{ platform: { id: number; name: string } }];
  developers: [{ name: string }];
};

export enum Status {
  LOADING = "loading",
  READY = "ready",
  ERROR = "error",
}

export interface IGamesSliceState {
  results: TGamesItem[];
  count: number;
  status: Status;
}
