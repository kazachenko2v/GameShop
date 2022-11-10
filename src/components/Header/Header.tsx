import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Squash as Hamburger } from "hamburger-react";

import { HeaderMenu } from "../";
import { PHONE, TABLET } from "../../constants";
import { MobileDropDownMenu, ScrollerButton } from "../UI";
import useBlockScreen from "../../hooks/useBlockScreen";

import img_logo from "../../assets/images/PS_Store_logo.png";
import img_title from "../../assets/images/PS_Store_title.png";
import styles from "./Header.module.css";
import Portal from "../../HOC/Portal";

const Header: React.FC = () => {
  const isTablet = useMediaQuery({ maxWidth: TABLET });
  const isPhone = useMediaQuery({ maxWidth: PHONE });
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);
  useBlockScreen(isOpenMenu);

  return (
    <header className={styles.container}>
      <ScrollerButton />
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
          <Portal>
            <MobileDropDownMenu
              isOpenMenu={isOpenMenu}
              setIsOpenMenu={setIsOpenMenu}
            >
              <HeaderMenu setIsOpenMenu={setIsOpenMenu} />
            </MobileDropDownMenu>
          </Portal>

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
        <HeaderMenu setIsOpenMenu={setIsOpenMenu} />
      )}
    </header>
  );
};

export default Header;
