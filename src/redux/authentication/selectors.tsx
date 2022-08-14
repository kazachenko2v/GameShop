import { RootState } from "../store";

export const getIsAuth = (state: RootState) => state.auth;
export const getUserName = (state: RootState) => state.auth.userName;
