import React from "react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

import { Favorites, User, MoneyCount } from "../";
import { HeaderMenuProps } from "../types";
import { useAuthListen } from "../../hooks/useGetDataFromDatabase";

import styles from "./HeaderMenu.module.css";
import cn from "classnames";

const HeaderMenu: React.FC<HeaderMenuProps> = ({ setIsOpenMenu }) => {
  const currentUser = useAuthListen();
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <Link
              className={styles.nav__link}
              to="/allgames"
              onClick={() => setIsOpenMenu(false)}
            >
              All Games
            </Link>
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
          <li>
            <Link
              className={cn(styles.nav__link, {
                [styles.nav__link_disabled]: !currentUser,
              })}
              to={currentUser ? "/library" : "/signin"}
              onClick={() => setIsOpenMenu(false)}
            >
              Library
            </Link>
          </li>
          <li>
            <Link
              className={cn(styles.nav__link, {
                [styles.nav__link_disabled]: !currentUser,
              })}
              to={currentUser ? "/favorites" : "/signin"}
              onClick={() => setIsOpenMenu(false)}
            >
              <Favorites />
            </Link>
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
