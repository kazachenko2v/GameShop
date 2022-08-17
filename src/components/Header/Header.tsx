import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Squash as Hamburger } from "hamburger-react";

import { MobileDropDownMenu, HeaderMenu } from "../";
import { PHONE, TABLET } from "../../constants";

import img_logo from "../../assets/images/PS_Store_logo.png";
import img_title from "../../assets/images/PS_Store_title.png";
import styles from "./Header.module.css";
import { useAuthListen } from "../../hooks/useGetDataFromDatabase";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = useAuthListen();
  const isTablet = useMediaQuery({ maxWidth: TABLET });
  const isPhone = useMediaQuery({ maxWidth: PHONE });
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);
  const handleClickOnLink = (page: string) => {
    if (page === "favorites" && !currentUser) {
      navigate("/signin");
    } else {
      navigate(`/${page}`, { replace: true });
    }
    setIsOpenMenu(false);
  };

  return (
    <header className={styles.container}>
      <Link className={styles.logo} to={`/`}>
        {isPhone ? (
          <img className={styles.logo_img} src={img_logo} alt="PS Store Logo" />
        ) : (
          <>
            <img
              className={styles.logo_img}
              src={img_logo}
              alt="PS Store Logo"
            />
            <img
              className={styles.logo_title}
              src={img_title}
              alt="PS Store Logo"
            />
          </>
        )}
      </Link>
      {isTablet ? (
        <>
          <MobileDropDownMenu
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
          >
            <HeaderMenu
              currentUser={currentUser}
              handleClickOnLink={handleClickOnLink}
              setIsOpenMenu={setIsOpenMenu}
            />
          </MobileDropDownMenu>
          <div className={styles.burger__container}>
            <Hamburger
              toggled={isOpenMenu}
              toggle={
                setIsOpenMenu as React.Dispatch<React.SetStateAction<boolean>>
              }
              label="Show menu"
              rounded
            />
          </div>
        </>
      ) : (
        <HeaderMenu
          currentUser={currentUser}
          handleClickOnLink={handleClickOnLink}
          setIsOpenMenu={setIsOpenMenu}
        />
      )}
    </header>
  );
};

export default Header;
