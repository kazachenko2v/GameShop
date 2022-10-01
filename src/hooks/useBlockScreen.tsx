import React from "react";

const useBlockScreen = (isOpenModal: boolean) => {
  React.useEffect(() => {
    const root = document.body.children[0] as HTMLElement;
    if (isOpenModal) {
      root.style.overflow = "hidden";
    } else {
      root.style.overflow = "auto";
    }

    return () => {
      root.style.overflow = "auto";
    };
  }, [isOpenModal]);
};

export default useBlockScreen;
