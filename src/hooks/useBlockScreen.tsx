import React from "react";

const useBlockScreen = (isOpenModal: boolean) => {
  React.useEffect(() => {
    const root = document.body.children[0] as HTMLElement;
    const body = document.body;

    if (isOpenModal) {
      root.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }
    return () => {
      root.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isOpenModal]);
};

export default useBlockScreen;
