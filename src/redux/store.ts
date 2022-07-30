import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter/slice";
import favoriteReducer from "./favorite/slice";
import { gameApi } from "./game/game.api";
import { gamesApi } from "./games/games.api";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    favorite: favoriteReducer,
    [gameApi.reducerPath]: gameApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddalware) =>
    getDefaultMiddalware()
      .concat(gameApi.middleware)
      .concat(gamesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
