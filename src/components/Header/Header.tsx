import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { CSSTransition } from "react-transition-group";
import { Squash as Hamburger } from "hamburger-react";

import { Favorites, Search } from "../";
import img_logo_desktop from "../../assets/images/PS_Store_logo_desktop.png";
import img_logo_tablet from "../../assets/images/PS_Store_logo_tablet.png";
import img_logo_phone from "../../assets/images/PS_Store_logo_phone.png";

import styles from "./Header.module.css";
import cn from "classnames";

const Header: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);
  const linkRef = useRef<HTMLUListElement>(null);
  const isTablet = useMediaQuery({ maxWidth: 912 });
  const isPhone = useMediaQuery({ maxWidth: 414 });

  React.useEffect(() => {
    const clickHeaderMenuHanlder = (e: MouseEvent) => {
      if (linkRef.current && e.composedPath().includes(linkRef.current)) {
        setIsOpenMenu(false);
      }
    };
    document.body.addEventListener("click", clickHeaderMenuHanlder);
    return () =>
      document.body.removeEventListener("click", clickHeaderMenuHanlder);
  }, []);

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
          <CSSTransition
            in={isOpenMenu}
            timeout={200}
            classNames={{
              enterActive: styles.blur_enter,
              enterDone: styles.blur_enter_active,
              exitActive: styles.blur_exit,
              exitDone: styles.blur_exit_active,
            }}
            unmountOnExit
            mountOnEnter
          >
            <div
              className={styles.blur}
              onClick={() => setIsOpenMenu(false)}
            ></div>
          </CSSTransition>
          <CSSTransition
            in={isOpenMenu}
            timeout={200}
            classNames={{
              enterActive: styles.menu_enter,
              enterDone: styles.menu_enter_active,
              exitActive: styles.menu_exit,
              exitDone: styles.menu_exit_active,
            }}
          >
            <div className={styles.menu}>
              <nav className={styles.navigation}>
                <ul ref={linkRef}>
                  <Link to={"/favorites"}>
                    <Favorites />
                  </Link>
                </ul>
              </nav>
              <Search setIsOpenMenu={setIsOpenMenu} />
            </div>
          </CSSTransition>
        </>
      ) : (
        <div className={styles.menu}>
          <nav className={styles.navigation}>
            <ul>
              <Link to={"/favorites"}>
                <Favorites />
              </Link>
            </ul>
          </nav>
          <Search />
        </div>
      )}

      {isTablet ? (
        <div className={styles.burger__container}>
          <Hamburger
            toggled={isOpenMenu}
            toggle={setIsOpenMenu}
            label="Show menu"
            rounded
          />
        </div>
      ) : null}
    </div>
  );
};

export default Header;
