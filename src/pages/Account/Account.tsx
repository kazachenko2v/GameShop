import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

import { GamesCardMini } from "../../components";
import { useAuthListen, useGetData } from "../../hooks/useGetDataFromDatabase";
import { updateUserField } from "../../firebase";

import UserPic from "../../assets/images/non-login-user.png";
import Pen from "../../assets/images/pen.svg";
import styles from "./Account.module.css";
import cn from "classnames";

const Account: React.FC = () => {
  const data = useGetData();
  const currentUser = useAuthListen();
  const h1Ref = React.useRef<HTMLHeadingElement | null>(null);
  const [changeName, setChangeName] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    setName(data?.name);
  }, [data]);

  React.useEffect(() => {
    if (changeName && h1Ref.current) {
      h1Ref.current.focus();
    }
  }, [changeName]);

  const qwe = async () => {
    if (changeName) {
      if (h1Ref.current) {
        await updateUserField(
          currentUser?.uid,
          "name",
          h1Ref.current.innerHTML
        );
        setChangeName(false);
      }
    } else {
      setChangeName(true);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image__container}>
          <img className={styles.image} src={UserPic} alt="User" />
        </div>
        <div className={styles.user__info}>
          {data ? (
            <>
              <div className={styles.name__container}>
                <h1
                  ref={h1Ref}
                  contentEditable={changeName}
                  suppressContentEditableWarning={true}
                  className={cn(styles.user__name, {
                    [styles.user__name_active]: changeName,
                  })}
                >
                  {name}
                </h1>
                <button className={styles.rename} onClick={qwe}>
                  <img src={Pen} alt="Rename" />
                </button>
              </div>

              <h2 className={styles.user__uid}>id: {currentUser?.uid}</h2>
              <h2 className={styles.user__email}>
                email: {currentUser?.email}
              </h2>
            </>
          ) : (
            <Skeleton count={3} className={styles.skeleton} />
          )}
        </div>
      </div>
      <h2 className={styles.visited__title}>Last Visited Games</h2>
      <div className={styles.visited__list}>
        {data
          ? data?.lastVisitedGames.map((id: number) => (
              <Link key={id} to={"/" + id}>
                <GamesCardMini id={id} />
              </Link>
            ))
          : [...new Array(8)].map((_, index) => (
              <Skeleton key={index} className={styles.skeleton__card} />
            ))}
      </div>
    </>
  );
};

export default Account;
