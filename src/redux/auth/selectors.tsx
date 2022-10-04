import { RootState } from "../store";

export const getUid = (state: RootState) => state.auth.uid;
export const getUserPic = (state: RootState) => state.auth.userPic;
