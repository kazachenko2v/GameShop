import React from "react";
import { CSSTransition } from "react-transition-group";
import { MenuMobileProps } from "../types";

import styles from "./MenuMobile.module.css";

const MenuMobile: React.FC<MenuMobileProps> = ({
  children,
  isOpenMenu,
  setIsOpenMenu,
}) => {
  React.useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpenMenu]);

  return (
    <>
      <CSSTransition
        in={isOpenMenu}
        timeout={200}
        classNames={{
          enterActive: styles.blur_enter,
          enterDone: styles.blur_enter_active,
          exitActive: styles.blur_exit,
          exitDone: styles.blur_exit_active,
        }}
        unmountOnExit
        mountOnEnter
      >
        <div className={styles.blur} onClick={() => setIsOpenMenu(false)}></div>
      </CSSTransition>
      <CSSTransition
        in={isOpenMenu}
        timeout={200}
        classNames={{
          enterActive: styles.menu_enter,
          enterDone: styles.menu_enter_active,
          exitActive: styles.menu_exit,
          exitDone: styles.menu_exit_active,
        }}
        mountOnEnter
      >
        <>{children}</>
      </CSSTransition>
    </>
  );
};

export default MenuMobile;
