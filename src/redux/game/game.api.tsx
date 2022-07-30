import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API, KEY_ID } from "../../constants";
import { IGame } from "./types";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getGame: builder.query<IGame, string | undefined>({
      query: (id) => ({
        url: "games/" + id,
        params: {
          key: KEY_ID,
        },
      }),
    }),
  }),
});

export const { useGetGameQuery } = gameApi;
