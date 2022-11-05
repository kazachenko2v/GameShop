import React from "react";
import { scrollToTop } from "../../../utils/scrollToTop";

import ArrowUp from "../../../assets/images/arrowUp.svg";
import styles from "./ScrollerButton.module.css";
import { useLocation } from "react-router-dom";

const ScrollerButton: React.FC = () => {
  const { pathname, search, hash } = useLocation();
  const [isActive, setIsActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    const scrollHandler = () => {
      setIsActive(window.pageYOffset > document.documentElement.clientHeight);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  React.useEffect(() => {
    scrollToTop();
  }, [pathname, search, hash]);

  return (
    <>
      {isActive ? (
        <button onClick={scrollToTop} className={styles.container}>
          <img src={ArrowUp} alt="Go Top" />
        </button>
      ) : null}
    </>
  );
};

export default ScrollerButton;
