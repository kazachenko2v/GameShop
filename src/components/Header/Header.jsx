import React from "react";

import Search from "../Search";
import Favorites from "../Favorites";
import img_logo from "../../assets/images/PS_Store_logo.png";

import { Link } from "react-router-dom";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <Link to={`/`}>
        <img src={img_logo} alt="PS Store Logo" />
      </Link>
      <nav className={styles.navigation__container}>
        <ul className={styles.navigation}>
          <Link to={"/favorites"}>
            <Favorites />
          </Link>
        </ul>
      </nav>
      <Search />
    </div>
  );
};

export default Header;
