import React from "react";

export const useActiveFiltersCount = (
  arr: [string, number[], number[], number[], string[]]
): number[] | undefined[] => {
  const [filtersCount, setFiltersCount] = React.useState<
    number[] | undefined[]
  >([]);

  React.useEffect(() => {
    let newArr: number[] = [];
    arr
      .map((item) => item.length)
      .forEach((item: number) => {
        if (item > 0) {
          newArr.push(item);
        }
      });
    setFiltersCount(newArr);
  }, [...arr]);

  return filtersCount;
};
