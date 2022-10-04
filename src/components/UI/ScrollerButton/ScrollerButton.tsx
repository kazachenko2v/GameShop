import React from "react";
import { scrollToTop } from "../../../utils/scrollToTop";

import ArrowUp from "../../../assets/images/arrowUp.svg";
import styles from "./ScrollerButton.module.css";

const ScrollerButton: React.FC = () => {
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
  }, [window.location.href]);

  return (
    <>
      {isActive ? (
        <a onClick={scrollToTop} className={styles.container}>
          <img src={ArrowUp} alt="Go Top" />
        </a>
      ) : null}
    </>
  );
};

export default ScrollerButton;
