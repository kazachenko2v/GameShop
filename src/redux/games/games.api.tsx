import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API, KEY_ID } from "../../constants";
import { IGames } from "./types";

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
  }),
});

export const { useGetGamesQuery, useLazyGetGamesQuery } = gamesApi;
