import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IGamesSliceState, Status, TGamesItem } from "./types";

export const fetchGames = createAsyncThunk<IGamesSliceState, string>(
  "games/fetchGamesStatus",
  async (url) => {
    const { data } = await axios.get(url);
    return data;
  }
);

const initialState: IGamesSliceState = {
  results: [],
  count: 1,
  status: Status.LOADING,
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addGames: (state, action: PayloadAction<TGamesItem[]>) => {
      state.results = [...state.results, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.results = [];
      state.count = 1;
      state.status = Status.LOADING;
    });
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.results = action.payload.results;
      state.count = action.payload.count;
      state.status = Status.READY;
    });
    builder.addCase(fetchGames.rejected, (state) => {
      state.results = [];
      state.count = 1;
      state.status = Status.ERROR;
    });
  },
});

export default gamesSlice.reducer;
