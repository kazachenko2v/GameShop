import React from "react";

export const useActiveFiltersCount = (arr: any[]): number[] | undefined[] => {
  const [filtersCount, setFiltersCount] = React.useState<
    number[] | undefined[]
  >([]);

  React.useEffect(() => {
    let newArr: number[] = [];
    arr
      .map((item) => item?.length)
      .forEach((item: number | undefined) => {
        if (item && item > 0) {
          newArr.push(item);
        }
      });
    setFiltersCount(newArr);
  }, [...arr]);

  return filtersCount;
};
