import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";
import { IFilterSliceState } from "./types";
import { START_PAGE } from "../../constants";

const initialState: IFilterSliceState = {
  page:
    window.location.search && getLocalStorage("page")
      ? getLocalStorage("page")
      : START_PAGE,
  platformsId:
    window.location.search && getLocalStorage("platforms")
      ? getLocalStorage("platforms")
      : [],
  genresId:
    window.location.search && getLocalStorage("genres")
      ? getLocalStorage("genres")
      : [],
  tagsId:
    window.location.search && getLocalStorage("tags")
      ? getLocalStorage("tags")
      : [],
  search:
    window.location.search && getLocalStorage("search")
      ? getLocalStorage("search")
      : "",
  dates:
    window.location.search && getLocalStorage("dates")
      ? getLocalStorage("dates")
      : [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPlatformsId: (state, action: PayloadAction<number[]>) => {
      state.platformsId = action.payload;
    },
    setGenresId: (state, action: PayloadAction<number[]>) => {
      state.genresId = action.payload;
    },
    setTagsId: (state, action: PayloadAction<number[]>) => {
      state.tagsId = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setDates: (state, action: PayloadAction<string[]>) => {
      state.dates = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilterSliceState>) => {
      state.page = action.payload.page;
      state.search = action.payload.search;
      state.platformsId = action.payload.platformsId;
      state.genresId = action.payload.genresId;
      state.tagsId = action.payload.tagsId;
      state.dates = action.payload.dates;
    },
  },
});

export const {
  setCurrentPage,
  setPlatformsId,
  setGenresId,
  setTagsId,
  setFilters,
  setSearchQuery,
  setDates,
} = filterSlice.actions;

export default filterSlice.reducer;
