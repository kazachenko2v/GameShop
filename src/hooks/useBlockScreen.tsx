import React from "react";

const useBlockScreen = (isOpenModal: boolean) => {
  React.useEffect(() => {
    const root = document.body.children[0] as HTMLElement;
    if (isOpenModal) {
      root.style.overflow = "hidden";
    } else {
      root.style.overflow = "";
    }
    return () => {
      root.style.overflow = "";
    };
  }, [isOpenModal]);
};

export default useBlockScreen;
