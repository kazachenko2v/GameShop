export const arraysComparing = (
  startPlatformsRef: any[],
  selectedPlatformsRef: any[]
): any[] | undefined => {
  /* compare starting and modified platforms arrays to make a new request or not */
  const toUpdate = !(
    JSON.stringify(startPlatformsRef) === JSON.stringify(selectedPlatformsRef)
  );

  if (toUpdate) {
    return selectedPlatformsRef;
  } else {
    return;
  }
};
