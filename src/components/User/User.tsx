import React from "react";
import { useNavigate } from "react-router-dom";
import { signOutCustom } from "../../firebase";

import { useAuthListen } from "../../hooks/useGetDataFromDatabase";
import { SeacrhProp } from "../types";

import UserPic from "../../assets/images/non-login-user.svg";
import Logout from "../../assets/images/logout.svg";
import styles from "./User.module.css";

const User: React.FC<SeacrhProp> = ({ setIsOpenMenu }) => {
  const navigate = useNavigate();
  const currentUser = useAuthListen();

  const singInHandler = () => {
    setIsOpenMenu(false);
    navigate("/signin");
  };

  return (
    <>
      <div className={styles.container}>
        <a onClick={singInHandler} className={styles.button_user}>
          <img className={styles.pic_user} src={UserPic} alt="User Avatar" />
          <span>{currentUser ? currentUser.displayName : "User"}</span>
        </a>
        {currentUser && (
          <a onClick={signOutCustom}>
            <img className={styles.pic_logout} src={Logout} alt="Logout" />
          </a>
        )}
      </div>
    </>
  );
};

export default User;
