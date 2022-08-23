import React from "react";
import { useNavigate } from "react-router-dom";
import { signOutCustom } from "../../firebase";

import { useAuthListen } from "../../hooks/useGetDataFromDatabase";
import { SeacrhProp } from "../types";

import UserPic from "../../assets/images/non-login-user.svg";
import Logout from "../../assets/images/logout.svg";
import styles from "./User.module.css";
import cn from "classnames";

const User: React.FC<SeacrhProp> = () => {
  const navigate = useNavigate();
  const currentUser = useAuthListen();
  const [isOpen, setisOpen] = React.useState(false);

  const singInHandler = () => {
    // setIsOpenMenu(false);
    navigate("/signin");
    // setisOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <a
        onMouseOver={currentUser ? () => setisOpen(!isOpen) : singInHandler}
        onClick={currentUser ? singInHandler : undefined}
        className={styles.button_user}
      >
        <img className={styles.pic_user} src={UserPic} alt="User Avatar" />
        <span>{currentUser ? currentUser.displayName : "User"}</span>
      </a>
      {currentUser && (
        // <ul className={cn(styles.list, { [styles.list_active]: isOpen })}>
        <ul className={styles.list}>
          <li>Personal Page</li>
          <li className={styles.logout_container} onClick={signOutCustom}>
            <span>Logout</span>{" "}
            <img className={styles.pic_logout} src={Logout} alt="Logout" />
          </li>
        </ul>
      )}
    </div>
  );
};

export default User;
