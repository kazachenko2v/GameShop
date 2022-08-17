import React from "react";
import { CSSTransition } from "react-transition-group";
import { MobileDropDownMenuProps } from "../types";

import styles from "./MobileDropDownMenu.module.css";

const MobileDropDownMenu: React.FC<MobileDropDownMenuProps> = ({
  children,
  isOpenMenu,
  setIsOpenMenu,
}) => {
  React.useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenMenu]);

  return (
    <>
      <CSSTransition
        in={isOpenMenu}
        timeout={200}
        classNames={{
          enter: styles.blur_enter,
          enterActive: styles.blur_enter_active,
          enterDone: styles.blur_enter_done,
          exit: styles.blur_exit,
          exitActive: styles.blur_exit_active,
          exitDone: styles.blur_exit_done,
        }}
        mountOnEnter
      >
        <div className={styles.blur} onClick={() => setIsOpenMenu(false)}></div>
      </CSSTransition>
      <CSSTransition
        in={isOpenMenu}
        timeout={200}
        classNames={{
          enter: styles.menu_enter,
          enterActive: styles.menu_enter_active,
          enterDone: styles.menu_enter_done,
          exit: styles.menu_exit,
          exitActive: styles.menu_exit_active,
          exitDone: styles.menu_exit_done,
        }}
        unmountOnExit
        mountOnEnter
      >
        <>{children}</>
      </CSSTransition>
    </>
  );
};

export default MobileDropDownMenu;
