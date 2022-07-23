import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Squash as Hamburger } from "hamburger-react";

import { Favorites, Search, MenuMobile } from "../";

import img_logo_desktop from "../../assets/images/PS_Store_logo_desktop.png";
import img_logo_phone from "../../assets/images/PS_Store_logo_phone.png";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);
  const isTablet = useMediaQuery({ maxWidth: 912 });
  const isPhone = useMediaQuery({ maxWidth: 414 });

  const handleClickOnLink = (page: string) => {
    setIsOpenMenu(false);
    navigate(`/${page}`, { replace: true });
  };

  React.useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpenMenu]);

  return (
    <div className={styles.container}>
      <Link className={styles.logo} to={`/`}>
        {isPhone ? (
          <img src={img_logo_phone} alt="PS Store Logo" />
        ) : (
          <img src={img_logo_desktop} alt="PS Store Logo" />
        )}
      </Link>
      {isTablet ? (
        <>
          <MenuMobile
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
            handleClickOnLink={handleClickOnLink}
          />
          <div className={styles.burger__container}>
            <Hamburger
              toggled={isOpenMenu}
              toggle={setIsOpenMenu}
              label="Show menu"
              rounded
            />
          </div>
        </>
      ) : (
        <div className={styles.menu}>
          <nav className={styles.navigation}>
            <ul>
              <li onClick={() => handleClickOnLink("favorites")}>
                <Favorites />
              </li>
            </ul>
          </nav>
          <Search />
        </div>
      )}
    </div>
  );
};

export default Header;
