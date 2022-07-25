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
      <nav className={styles.navigation}>
        <ul>
          <li onClick={() => handleClickOnLink("favorites")}>
            <Favorites />
          </li>
        </ul>
      </nav>
      <Search setIsOpenMenu={setIsOpenMenu} />
    </div>
  );
};

export default HeaderMenu;
