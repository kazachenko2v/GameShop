import React from "react";

const useBlockScreen = (isOpenModal: boolean) => {
  React.useEffect(() => {
    const body = document.body;
    if (isOpenModal) {
      body.style.overflow = "hidden";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [isOpenModal]);
};

export default useBlockScreen;
