import React from "react";
import { Favorites, Search } from "../";
import { HeaderMenuProps } from "../types";
import { HashLink } from "react-router-hash-link";

import styles from "./HeaderMenu.module.css";
import { useSelector } from "react-redux";
import { getIsAuth } from "../../redux/authentication/selectors";

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  handleClickOnLink,
  setIsOpenMenu,
}) => {
  const { userId } = useSelector(getIsAuth);

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
          <li>
            <HashLink
              className={styles.nav__link}
              to="/#genres"
              onClick={() => setIsOpenMenu(false)}
            >
              {"Genres"}
            </HashLink>
          </li>
          {userId && (
            <li
              className={styles.nav__link}
              onClick={() => handleClickOnLink("favorites")}
            >
              <Favorites />
            </li>
          )}
        </ul>
      </nav>
      <Search setIsOpenMenu={setIsOpenMenu} />
    </div>
  );
};

export default HeaderMenu;
