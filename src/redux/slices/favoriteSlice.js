import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";

const arr = getLocalStorage("favorites");

const initialState = {
  count: arr ? arr.length : 0,
  games: arr ? arr : [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addGame: (state, action) => {
      state.count += 1;
      state.games = [...state.games, action.payload];
    },
    removeGame: (state, action) => {
      state.count -= 1;
      state.games = state.games.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addGame, removeGame } = favoriteSlice.actions;

export default favoriteSlice.reducer;
