import React from "react";
import { useNavigate } from "react-router";
import {
  creacteUserName,
  createUser,
  createUsersFavoriteList,
} from "../../firebase";

import { getErrorMessage } from "../../utils/getErrorMessage";

import styles from "../SignIn/SignIn.module.css";

const CreateAccount: React.FC = () => {
  const [errorText, setErrorText] = React.useState<string>("");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const createUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser(data.email, data.password)
      .then(async (user) => {
        await createUsersFavoriteList(user.user.uid, data.name);
        await creacteUserName(data.name);
        navigate("/");
      })
      .catch((error) => {
        setErrorText(getErrorMessage(error));
      });
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
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className={styles.input_text}
            required
          />
        </label>
        <label className={styles.input_container}>
          <input
            value={data.email}
            type="email"
            placeholder="Email"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className={styles.input_text}
          />
        </label>
        <label className={styles.input_container}>
          <input
            value={data.password}
            type="password"
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
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
