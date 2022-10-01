import React from "react";
import { ModalProps } from "../types";

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
    <div className={styles.blur} onClick={() => setIsOpen(false)}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {children}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Modal;
