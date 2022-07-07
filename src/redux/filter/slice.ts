import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";
import { IFilterSliceState } from "./types";
import { ALL_PLATFORMS_ID, START_PAGE } from "../../constants";

const initialState: IFilterSliceState = {
  page:
    window.location.search && getLocalStorage("page")
      ? getLocalStorage("page")
      : START_PAGE,
  platformsId:
    window.location.search && getLocalStorage("platformsId")
      ? getLocalStorage("platformsId")
      : ALL_PLATFORMS_ID,
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setDates: (state, action: PayloadAction<string[]>) => {
      state.dates = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilterSliceState>) => {
      state.page = action.payload.page;
      state.platformsId = action.payload.platformsId;
      state.search = action.payload.search;
      state.dates = action.payload.dates;
    },
  },
});

export const {
  setCurrentPage,
  setPlatformsId,
  setFilters,
  setSearchQuery,
  setDates,
} = filterSlice.actions;

export default filterSlice.reducer;