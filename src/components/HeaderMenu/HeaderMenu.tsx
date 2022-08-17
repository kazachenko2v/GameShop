import React from "react";
import { Favorites, Search, User } from "../";
import { HeaderMenuProps } from "../types";
import { HashLink } from "react-router-hash-link";

import styles from "./HeaderMenu.module.css";
import cn from "classnames";

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  currentUser,
  handleClickOnLink,
  setIsOpenMenu,
}) => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li
            className={styles.nav__link}
            onClick={() => handleClickOnLink("allgames")}
          >
            {"All Games"}
          </li>
          <li>
            <HashLink
              className={styles.nav__link}
              to="/#genres"
              onClick={() => setIsOpenMenu(false)}
            >
              {"Genres"}
            </HashLink>
          </li>
          <li
            className={cn(styles.nav__link, {
              [styles.nav__link_disabled]: !currentUser,
            })}
            onClick={() => handleClickOnLink("favorites")}
          >
            <Favorites />
          </li>
        </ul>
      </nav>
      <Search setIsOpenMenu={setIsOpenMenu} />
      <User setIsOpenMenu={setIsOpenMenu} />
    </div>
  );
};

export default HeaderMenu;
