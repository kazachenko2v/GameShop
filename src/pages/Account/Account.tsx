import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { GamesCardMini } from "../../components";
import { Input, Modal } from "../../components/UI";
import { useAuthListen, useGetData } from "../../hooks/useGetDataFromDatabase";
import useBlockScreen from "../../hooks/useBlockScreen";
import { updateUserField, storage, updateImage } from "../../firebase";

import UserPic from "../../assets/images/non-login-user.png";
import Pen from "../../assets/images/pen.svg";
import Close from "../../assets/images/close.svg";

import styles from "./Account.module.css";
import cn from "classnames";

const Account: React.FC = () => {
  const data = useGetData();
  const currentUser = useAuthListen();
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false);
  const [newName, setNewName] = React.useState<string>("");
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string>("");
  const [rdy, setRdy] = React.useState<boolean>(true);
  const [perc, setPerc] = React.useState<number | null>(null);
  const isImageUploading = perc !== null && perc < 100;
  useBlockScreen(isOpenModal);

  React.useEffect(() => {
    if (file) {
      const uploadFile = () => {
        const newName = new Date().getTime() + file.name;
        const storageRef = ref(storage, newName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            setPerc(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              updateImage(downloadURL, setRdy);
            });
          }
        );
      };

      uploadFile();
    }
  }, [file]);

  const acceptNewName = () => {
    if (newName.length === 0) {
      setError("Please, enter the correct name");
    } else {
      updateUserField("name", newName);
      setIsOpenModal(false);
    }
  };

  React.useEffect(() => {
    setError("");
    setNewName(data?.name);
  }, [isOpenModal]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files![0]);
      setRdy(false);
    }
  };

  const removeImage = () => {
    updateImage("", setRdy);
    setFile(null);
  };

  const valueCleaner = (e: React.MouseEvent) => {
    (e.target as HTMLInputElement).value = "";
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.image__container}>
          {data?.imageUrl && (
            <button className={styles.button__remove} onClick={removeImage}>
              <img className={styles.img__remove} src={Close} alt="Remove" />
            </button>
          )}
          <label>
            <input
              disabled={isImageUploading}
              className={styles.input__file}
              type="file"
              onClick={valueCleaner}
              onChange={changeHandler}
            ></input>
            {isImageUploading || !rdy || data === null ? (
              // user is authorized and waiting for a response from the database
              <Skeleton
                className={cn(styles.image, {
                  [styles.image_disabled]: isImageUploading,
                })}
              />
            ) : (
              // response received
              <img
                className={styles.image}
                src={data.imageUrl ? data.imageUrl : UserPic}
                alt="User"
              />
            )}
          </label>
        </div>
        <div className={styles.user__info}>
          {data ? (
            <>
              <div className={styles.name__container}>
                <h1 className={styles.user__name}>{data?.name}</h1>
                <button
                  className={styles.rename}
                  onClick={() => setIsOpenModal(true)}
                >
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
      {isOpenModal && (
        <Modal
          newValue={newName}
          error={error}
          setIsOpen={setIsOpenModal}
          acceptHandler={acceptNewName}
        >
          <Input
            newValue={newName}
            value={data?.name}
            setError={setError}
            setValue={setNewName}
            acceptHandler={acceptNewName}
          />
        </Modal>
      )}
      <h2 className={styles.visited__title}>Last Visited Games</h2>
      <div className={styles.visited__list}>
        {data
          ? data?.lastVisitedGames.map((id: number) => (
              <Link key={id} to={"/" + id}>
                <GamesCardMini id={id} />
              </Link>
            ))
          : [...new Array(4)].map((_, index) => (
              <div key={index} className={styles.skeleton__card__container}>
                <Skeleton className={styles.skeleton__card} />
              </div>
            ))}
      </div>
    </>
  );
};

export default Account;
