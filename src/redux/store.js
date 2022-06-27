import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import favoriteReducer from "./slices/favoriteSlice";
import gamesReducer from "./slices/gamesSlice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    favorite: favoriteReducer,
    games: gamesReducer,
  },
});
