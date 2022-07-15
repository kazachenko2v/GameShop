import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { setPlatformsId } from "../../redux/filter/slice";
import { TPlatformsId } from "../../redux/filter/types";
import { setLocalStorage } from "../localStorage";

export const updateOrNot = (
  startPlatformsRef: TPlatformsId,
  selectedPlatformsRef: TPlatformsId,
  dispatch: Dispatch<AnyAction>
) => {
  const sortedSelectedPlatformsRef = selectedPlatformsRef.sort((a, b) => a - b);

  /* compare starting and modified platforms arrays to make a new request or not */
  const toUpdate = !(
    JSON.stringify(startPlatformsRef) ===
    JSON.stringify(sortedSelectedPlatformsRef)
  );

  if (toUpdate) {
    if (sortedSelectedPlatformsRef) {
      dispatch(setPlatformsId(sortedSelectedPlatformsRef!));
      setLocalStorage("platformsId", sortedSelectedPlatformsRef);
    }
  }
};
