import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API, KEY_ID } from "../../constants";
import { GenresResult, GamesResult, IGame } from "./types";

export const gamesApi = createApi({
  reducerPath: "gamesApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getGames: builder.query<GamesResult, [number, string]>({
      query: ([count, state]) => ({
        url: "games?" + state,
        params: {
          key: KEY_ID,
          page_size: count,
        },
      }),
    }),
    getGame: builder.query<IGame, string | undefined>({
      query: (id) => ({
        url: "games/" + id,
        params: {
          key: KEY_ID,
        },
      }),
    }),
    getGenres: builder.query<GenresResult, void>({
      query: () => ({
        url: "genres?",
        params: {
          key: KEY_ID,
        },
      }),
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

export const {
  useGetGamesQuery,
  useGetGameQuery,
  useGetGenresQuery,
  useGetGenreQuery,
} = gamesApi;
