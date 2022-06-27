import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGames = createAsyncThunk(
  "games/fetchGamesStatus",
  async (url) => {
    const { data } = await axios.get(url);
    return data;
  }
);

const initialState = {
  games: [],
  gamesCount: 1,
  status: "",
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  extraReducers: {
    [fetchGames.pending]: (state) => {
      state.games = [];
      state.gamesCount = 1;
      state.status = "loading";
    },
    [fetchGames.fulfilled]: (state, action) => {
      state.games = action.payload.results;
      state.gamesCount = action.payload.count;
      state.status = "ready";
    },
    [fetchGames.rejected]: (state) => {
      state.games = [];
      state.gamesCount = 1;
      state.status = "error";
    },
  },
});

export default gamesSlice.reducer;
