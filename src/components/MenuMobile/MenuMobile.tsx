import React from "react";
import { CSSTransition } from "react-transition-group";
import { Favorites, Search } from "../";
import { MenuMobileProps } from "../types";

import styles from "./MenuMobile.module.css";

const MenuMobile: React.FC<MenuMobileProps> = ({
  isOpenMenu,
  setIsOpenMenu,
  handleClickOnLink,
}) => {
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
      >
        <div className={styles.menu}>
          <nav className={styles.navigation}>
            <ul>
              <li onClick={() => handleClickOnLink("favorites")}>
                <Favorites />
              </li>
            </ul>
          </nav>
          <Search setIsOpenMenu={setIsOpenMenu} />
        </div>
      </CSSTransition>
    </>
  );
};

export default MenuMobile;
