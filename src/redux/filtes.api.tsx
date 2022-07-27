import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API, KEY_ID } from "../constants";

export const filtersApi = createApi({
  reducerPath: "filtesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getTags: builder.query<Result[], void>({
      query: () => `tags${KEY_ID}`,
      transformResponse: (response: RootObject) => response.results,
    }),
  }),
});

export const { useGetTagsQuery } = filtersApi;

export interface Game {
  id: number;
  slug: string;
  name: string;
  added: number;
}

export interface Result {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  language: string;
  games: Game[];
}

export interface RootObject {
  count: number;
  next: string;
  previous?: any;
  results: Result[];
}
