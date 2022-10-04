import React from "react";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { Favorites, User, MoneyCount } from "../";
import { HeaderMenuProps } from "../types";

import styles from "./HeaderMenu.module.css";
import cn from "classnames";

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  currentUser,
  handleClickOnLink,
  setIsOpenMenu,
}) => {
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li
            className={styles.nav__link}
            onClick={() => handleClickOnLink("allgames")}
          >
            All Games
          </li>
          <li>
            <HashLink
              className={styles.nav__link}
              to="/#genres"
              onClick={() => setIsOpenMenu(false)}
            >
              Genres
            </HashLink>
          </li>
          <li
            className={cn(styles.nav__link, {
              [styles.nav__link_disabled]: !currentUser,
            })}
            onClick={() => handleClickOnLink("library")}
          >
            Library
          </li>
          <li
            className={cn(styles.nav__link, {
              [styles.nav__link_disabled]: !currentUser,
            })}
            onClick={() => handleClickOnLink("favorites")}
          >
            <Favorites />
          </li>
          {currentUser && (
            <li
              className={cn(styles.nav__link, {
                [styles.nav__link_disabled]: !currentUser,
              })}
              onClick={() => setIsOpenModal(!isOpenModal)}
            >
              <MoneyCount
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
              />
            </li>
          )}
        </ul>
      </nav>
      <User setIsOpenMenu={setIsOpenMenu} />
    </div>
  );
};

export default HeaderMenu;
