import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page:
    window.location.search && localStorage.getItem("page")
      ? localStorage.getItem("page")
      : 1,
  platformsId:
    window.location.search && localStorage.getItem("platformsId")
      ? localStorage.getItem("platformsId")
      : [1, 2, 3, 4, 8],
  search:
    window.location.search && localStorage.getItem("search")
      ? localStorage.getItem("search")
      : "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.page = Number(action.payload);
    },
    setPlatformsId: (state, action) => {
      state.platformsId = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.search = action.payload;
    },
    setFilters: (state, action) => {
      state.page = Number(action.payload.page);
      state.platformsId = action.payload.parent_platforms;
    },
  },
});

export const { setCurrentPage, setPlatformsId, setFilters, setSearchQuery } =
  filterSlice.actions;

export default filterSlice.reducer;
