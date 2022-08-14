import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLocalStorage } from "../../utils/localStorage";

const initialState: { userId: string; userName: string } = {
  userId: getLocalStorage("userId") ? getLocalStorage("userId") : "",
  userName: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserId, setUserName } = authSlice.actions;

export default authSlice.reducer;
