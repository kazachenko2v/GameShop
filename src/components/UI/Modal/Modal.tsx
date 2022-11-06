import React from "react";
import Portal from "../../../HOC/Portal";
import { ModalProps } from "../../types";

import styles from "./Modal.module.css";

const Modal: React.FC<ModalProps> = ({
  children,
  error,
  newValue,
  setIsOpen,
  acceptHandler,
}) => {
  const [height, setHeight] = React.useState({
    height: "100%",
  });

  React.useEffect(() => {
    if (window !== null && window.visualViewport !== null) {
      const changeheight = () => {
        setHeight({ height: window.visualViewport?.height + "px" });
        document.body.style.height = window.visualViewport?.height + "px";
      };

      window.addEventListener("resize", changeheight);

      return () => {
        document.body.style.height = "100vh";
        window.removeEventListener("resize", changeheight);
      };
    }
  }, [height]);

  React.useEffect(() => {
    const keyHandle = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        acceptHandler();
      } else if (e.code === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", keyHandle);
    return () => window.removeEventListener("keydown", keyHandle);
  }, [newValue]);

  return (
    <Portal>
      <div
        className={styles.blur}
        style={height}
        onClick={() => setIsOpen(false)}
      >
        <div className={styles.container} onClick={(e) => e.stopPropagation()}>
          {children}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
