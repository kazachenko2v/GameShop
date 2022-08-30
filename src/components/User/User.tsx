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
  const [name, setName] = React.useState<string>("");
  const isLoading = useIsLoading(currentUser);

  React.useEffect(() => {
    if (getLocalStorage("uid")) {
      setName(data?.name);
    }
  }, [data]);

  const singInHandler = () => {
    setIsOpenMenu(false);
    navigate("/signin");
  };

  const singOutHandler = () => {
    localStorage.removeItem("uid");
    dispatch(setUid(null));
    signOutCustom();
    setName("");
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
      <a
        onClick={currentUser ? undefined : singInHandler}
        className={styles.button_user}
      >
        {!getLocalStorage("uid") ? (
          // user is not authorized
          <span>User</span>
        ) : isLoading ? (
          // user is authorized and waiting for a response from the database
          <Skeleton className={styles.skeleton} />
        ) : (
          // response received
          <span>{name}</span>
        )}
        <img className={styles.pic_user} src={UserPic} alt="User Avatar" />
      </a>
      {currentUser && (
        <ul className={cn(styles.list, { [styles.list_active]: isOpen })}>
          <li>
            <a onClick={swithToAccount}>Account</a>
          </li>
          <li>
            <a onClick={singOutHandler}>Logout</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default User;
