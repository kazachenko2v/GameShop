import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { createUser, createUserField } from "../../firebase";

import { setUid } from "../../redux/auth/slice";

import { getErrorMessage } from "../../utils/getErrorMessage";
import { setLocalStorage } from "../../utils/localStorage";

import styles from "../SignIn/SignIn.module.css";

const CreateAccount: React.FC = () => {
  const [errorText, setErrorText] = React.useState<string>("");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser(data.email, data.password)
      .then(async (user) => {
        await createUserField(user.user.uid, "favGames", []);
        await createUserField(user.user.uid, "lastVisitedGames", []);
        await createUserField(user.user.uid, "name", data.name);
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

  return (
    <div className={styles.container}>
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
        <button type="submit" className={styles.button}>
          Creacte
        </button>
      </form>
      {errorText && <p className={styles.error}>{errorText}</p>}
      <span className={styles.text}>Don't want to link this account? </span>
      <button className={styles.link} onClick={() => navigate("/signin")}>
        Sign in.
      </button>
    </div>
  );
};

export default CreateAccount;
