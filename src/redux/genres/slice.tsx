import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IGenresSliceState, Status, TGenresItem } from "./types";

export const fetchGenres = createAsyncThunk<IGenresSliceState, string>(
  "games/fetchGenresStatus",
  async (url) => {
    const { data } = await axios.get(url);
    return data;
  }
);

const initialState: IGenresSliceState = {
  results: [],
  status: Status.LOADING,
};

export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    addGenres: (state, action: PayloadAction<TGenresItem[]>) => {
      state.results = [...state.results, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenres.pending, (state) => {
      state.results = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.results = action.payload.results;
      state.status = Status.READY;
    });
    builder.addCase(fetchGenres.rejected, (state) => {
      state.results = [];
      state.status = Status.ERROR;
    });
  },
});

export default genresSlice.reducer;
