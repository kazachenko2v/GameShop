import React from "react";
import { useNavigate } from "react-router";

import { User } from "../";
import { useAuthListen } from "../../hooks/useGetDataFromDatabase";
import { signOutCustom } from "../../firebase";

import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = useAuthListen();

  const singOutHandler = () => {
    signOutCustom();
  };

  return (
    <footer className={styles.container}>
      {/* {currentUser ? (
        <button onClick={singOutHandler} className={styles.button}>
          Log Out
        </button>
      ) : (
        <button onClick={() => navigate("/signin")} className={styles.button}>
          Log In
        </button>
      )}
      <User /> */}
    </footer>
  );
};

export default Footer;
