import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";
import { IFavoriteSliceState } from "./types";

const arr = getLocalStorage("favorites");

const initialState: IFavoriteSliceState = {
  count: arr ? arr.length : 0,
  gamesId: arr ? arr : [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<number>) => {
      state.count += 1;
      state.gamesId = [...state.gamesId, action.payload];
    },
    removeGame: (state, action: PayloadAction<number>) => {
      state.count -= 1;
      state.gamesId = state.gamesId.filter((id) => id !== action.payload);
    },
  },
});

export const { addGame, removeGame } = favoriteSlice.actions;

export default favoriteSlice.reducer;
