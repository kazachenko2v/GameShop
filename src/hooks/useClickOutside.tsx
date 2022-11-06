import React from "react";

export const useClickOutside = (
  handler: () => void
): React.RefObject<HTMLDivElement> => {
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const outsideClickHandler = (event: MouseEvent) => {
      if (
        /* when you click outside of the dropdown menu */
        domRef.current &&
        !domRef.current.contains(event.target as Node)
      ) {
        handler();
      }
    };

    document.body.addEventListener("click", outsideClickHandler);
    return () =>
      document.body.removeEventListener("click", outsideClickHandler);
  }, []);

  return domRef;
};
