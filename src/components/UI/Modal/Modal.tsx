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
      <div className={styles.container}>
        <div className={styles.content}>
          {children}
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.blur} onClick={() => setIsOpen(false)}></div>
      </div>
    </Portal>
  );
};

export default Modal;
