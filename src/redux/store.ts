import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filter/slice";
import authReducer from "./auth/slice";
import { gamesApi } from "./games/games.api";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    auth: authReducer,
    [gamesApi.reducerPath]: gamesApi.reducer,
  },
  middleware: (getDefaultMiddalware) =>
    getDefaultMiddalware().concat(gamesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
