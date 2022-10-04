import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";

const initialState: { uid: string | null; userPic: string | null } = {
  uid: getLocalStorage("uid") ? getLocalStorage("uid") : null,
  userPic: getLocalStorage("userPic") ? getLocalStorage("userPic") : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUid: (state, action: PayloadAction<string | null>) => {
      state.uid = action.payload;
    },
    setUserPic: (state, action: PayloadAction<string | null>) => {
      state.userPic = action.payload;
    },
  },
});

export const { setUid, setUserPic } = authSlice.actions;

export default authSlice.reducer;
