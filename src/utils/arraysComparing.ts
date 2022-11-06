export const isEqual = (
  startPlatformsRef: any[],
  selectedPlatformsRef: any[]
): boolean => {
  /* compare starting and modified arrays to make a new request or not */
  return (
    JSON.stringify(startPlatformsRef) === JSON.stringify(selectedPlatformsRef)
  );
};
