import React from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutCustom } from "../../firebase";

import { setUid } from "../../redux/auth/slice";
import { useAuthListen, useGetData } from "../../hooks/useGetDataFromDatabase";
import { SeacrhProp } from "../types";
import { getLocalStorage } from "../../utils/localStorage";
import useIsLoading from "./../../hooks/useIsLoading";

import UserPic from "../../assets/images/non-login-user.png";
import styles from "./User.module.css";
import cn from "classnames";

const User: React.FC<SeacrhProp> = ({ setIsOpenMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useAuthListen();
  const data = useGetData();
  const [isOpen, setisOpen] = React.useState(false);
  const isLoadingName = useIsLoading(currentUser);
  const isLoadingImage = useIsLoading(data?.imageUrl);

  const singInHandler = () => {
    setIsOpenMenu(false);
    navigate("/signin");
  };

  const singOutHandler = () => {
    localStorage.removeItem("uid");
    dispatch(setUid(null));
    signOutCustom();
  };

  const swithToAccount = () => {
    navigate("/account");
    setIsOpenMenu(false);
  };

  return (
    <div
      onMouseEnter={() => setisOpen(true)}
      onMouseLeave={() => setisOpen(false)}
      className={styles.container}
    >
      <button
        onClick={currentUser ? undefined : singInHandler}
        className={styles.button_user}
      >
        {!getLocalStorage("uid") ? (
          // user is not authorized
          <span>User</span>
        ) : isLoadingName ? (
          // user is authorized and waiting for a response from the database
          <Skeleton className={styles.skeleton} />
        ) : (
          // response received
          <span>{data?.name}</span>
        )}
        {!getLocalStorage("uid") ? (
          // user is not authorized
          <img className={styles.pic_user} src={UserPic} alt="User Avatar" />
        ) : isLoadingImage ? (
          // user is authorized and waiting for a response from the database
          <Skeleton className={styles.pic_user} />
        ) : (
          // response received
          <img
            className={styles.pic_user}
            src={data?.imageUrl.length ? data.imageUrl : UserPic}
            alt="User Avatar"
          />
        )}
      </button>
      {currentUser && (
        <ul className={cn(styles.list, { [styles.list_active]: isOpen })}>
          <li onClick={swithToAccount}>Account</li>
          <li onClick={singOutHandler}>Logout</li>
        </ul>
      )}
    </div>
  );
};

export default User;
