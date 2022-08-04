import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter/slice";
import favoriteReducer from "./favorite/slice";
import { gamesApi } from "./games/games.api";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    favorite: favoriteReducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddalware) =>
    getDefaultMiddalware().concat(gamesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
