import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";

const initialState: { uid: string | null } = {
  uid: getLocalStorage("uid") ? getLocalStorage("uid") : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUid: (state, action: PayloadAction<string | null>) => {
      state.uid = action.payload;
    },
  },
});

export const { setUid } = authSlice.actions;

export default authSlice.reducer;
