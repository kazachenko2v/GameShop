import React from "react";
import { Favorites, Search } from "../";
import { HeaderMenuProps } from "../types";

import styles from "./HeaderMenu.module.css";

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  handleClickOnLink,
  setIsOpenMenu,
}) => {
  return (
    <div className={styles.menu}>
      <nav>
        <ul className={styles.list}>
          <li
            className={styles.nav__link}
            onClick={() => handleClickOnLink("allgames")}
          >
            {"All Games"}
          </li>
          <li
            className={styles.nav__link}
            onClick={() => handleClickOnLink("favorites")}
          >
            <Favorites />
          </li>
        </ul>
      </nav>
      <Search setIsOpenMenu={setIsOpenMenu} />
    </div>
  );
};

export default HeaderMenu;
