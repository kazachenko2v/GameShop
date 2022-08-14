import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { useGetDataFromDatabase } from "../../hooks/useGetDataFromDatabase";
import { getIsAuth } from "../../redux/authentication/selectors";
import { setUserId, setUserName } from "../../redux/authentication/slice";

import User from "../../assets/images/non-login-user.svg";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, userName } = useSelector(getIsAuth);
  useGetDataFromDatabase();

  const singOutHandler = () => {
    dispatch(setUserName(""));
    dispatch(setUserId(""));
    localStorage.removeItem("userId");
  };

  return (
    <footer className={styles.container}>
      {userId ? (
        <button onClick={singOutHandler} className={styles.button}>
          Log Out
        </button>
      ) : (
        <button onClick={() => navigate("/signin")} className={styles.button}>
          Log In
        </button>
      )}

      <button
        onClick={() => navigate("/signin")}
        className={styles.button_user}
      >
        <span>{userName}</span>
        <img src={User} alt="User Avatar" />
      </button>
    </footer>
  );
};

export default Footer;
