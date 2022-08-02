import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API, KEY_ID } from "../../constants";
import { Genres, GenresResult, IGames } from "./types";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getGames: builder.query<IGames, [number, string]>({
      query: ([count, state]) => ({
        url: "games?" + state,
        params: {
          key: KEY_ID,
          page_size: count,
        },
      }),
    }),
    getGenres: builder.query<Genres[], void>({
      query: () => ({
        url: "genres?",
        params: {
          key: KEY_ID,
        },
      }),
      transformResponse: (response: GenresResult) => response.results,
    }),
    getGenre: builder.query<any, number>({
      query: (id) => ({
        url: "genres/" + id,
        params: {
          key: KEY_ID,
        },
      }),
    }),
  }),
});

export const { useGetGamesQuery, useGetGenresQuery, useGetGenreQuery } =
  gamesApi;
