import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { setUid } from "../../redux/auth/slice";

import { createUser, createUserField, storage } from "../../firebase";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { setLocalStorage } from "../../utils/localStorage";

import UserPic from "../../assets/images/non-login-user.png";
import Close from "../../assets/images/close.svg";
import styles from "./CreateAccount.module.css";

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorText, setErrorText] = React.useState<string>("");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    imageUrl: "",
  });
  const [file, setFile] = React.useState<File | null>(null);
  const [rdy, setRdy] = React.useState<boolean>(true);
  const [perc, setPerc] = React.useState<number | null>(null);
  const isImageUploading = (perc !== null && perc < 100) || !rdy;

  const userFields = [
    { name: "favGames", value: [] },
    { name: "lastVisitedGames", value: [] },
    { name: "purchasedGames", value: [] },
    { name: "name", value: data.name },
    { name: "money", value: 0 },
    { name: "imageUrl", value: data.imageUrl },
  ];

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
            setPerc(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              if (downloadURL) {
                setData((prev) => ({ ...prev, imageUrl: downloadURL }));
                setRdy(true);
              }
            });
          }
        );
      };

      uploadFile();
    }
  }, [file]);

  const createUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser(data.email, data.password)
      .then(async (user) => {
        userFields.forEach(
          async (item) =>
            await createUserField(user.user.uid, item.name, item.value)
        );
        setLocalStorage("uid", user.user.uid);
        dispatch(setUid(user.user.uid));
        navigate("/");
      })
      .catch((error) => {
        setErrorText(getErrorMessage(error));
      });
  };

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setData({ ...data, [value]: e.target.value });
    setErrorText("");
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files![0]);
      setRdy(false);
    }
  };

  const removeImage = () => {
    setData((prev) => ({ ...prev, imageUrl: "" }));
    setFile(null);
  };

  const valueCleaner = (e: React.MouseEvent) => {
    (e.target as HTMLInputElement).value = "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.img__container}>
        {data.imageUrl && (
          <button className={styles.button__remove} onClick={removeImage}>
            <img className={styles.img__remove} src={Close} alt="Remove" />
          </button>
        )}
        <label>
          <input
            className={styles.input__file}
            type="file"
            onClick={valueCleaner}
            onChange={changeHandler}
          ></input>
          {isImageUploading ? (
            <Skeleton className={styles.img} />
          ) : (
            <img
              className={styles.img}
              src={file ? URL.createObjectURL(file) : UserPic}
              alt="User"
            />
          )}
        </label>
      </div>
      <h1 className={styles.title}>Creacte Account</h1>
      <form onSubmit={createUserHandler}>
        <label className={styles.input_container}>
          <input
            value={data.name}
            type="text"
            placeholder="Name"
            onChange={(e) => inputHandler(e, "name")}
            className={styles.input_text}
            required
          />
        </label>
        <label className={styles.input_container}>
          <input
            value={data.email}
            type="email"
            placeholder="Email"
            onChange={(e) => inputHandler(e, "email")}
            className={styles.input_text}
          />
        </label>
        <label className={styles.input_container}>
          <input
            value={data.password}
            type="password"
            placeholder="Password"
            onChange={(e) => inputHandler(e, "password")}
            className={styles.input_text}
            required
          />
        </label>
        <button
          disabled={isImageUploading}
          type="submit"
          className={styles.button}
        >
          Creacte
        </button>
      </form>
      {errorText && <p className={styles.error}>{errorText}</p>}
      <span className={styles.text}>Already have an Account? </span>
      <button className={styles.link} onClick={() => navigate("/signin")}>
        Sign in.
      </button>
    </div>
  );
};

export default CreateAccount;
