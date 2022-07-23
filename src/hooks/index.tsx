import React from "react";

export const useClickOutside = (
  handler: () => void
): React.RefObject<HTMLDivElement> => {
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const first = (event: MouseEvent) => {
      if (
        /* when you click outside of the dropdown menu */
        domRef.current &&
        !domRef.current.contains(event.target as Node)
      ) {
        handler();
      }
    };

    document.body.addEventListener("click", first);
    return () => document.body.removeEventListener("click", first);
  }, []);

  return domRef;
};

export const useActiveFiltersCount = (
  arr: [string, number[], string[]]
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
