import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter/slice";
import favoriteReducer from "./favorite/slice";
import gamesReducer from "./games/slice";
import genresReducer from "./genres/slice";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    favorite: favoriteReducer,
    games: gamesReducer,
    genres: genresReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
