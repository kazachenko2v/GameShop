import React from "react";
import { Favorites, Search } from "../";
import { HeaderMenuProps } from "../types";

import styles from "./HeaderMenu.module.css";

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  handleClickOnLink,
  setIsOpenMenu,
}) => {
  React.useEffect(() => {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);
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
