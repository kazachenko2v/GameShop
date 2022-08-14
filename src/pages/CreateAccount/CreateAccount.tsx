import React from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebase";

import { setUserId } from "../../redux/authentication/slice";
import { setLocalStorage } from "../../utils/localStorage";
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
  const dispatch = useDispatch();

  const createUserHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, "favorites", user.user.uid), {
        name: data.name,
        favGames: [],
      });

      navigate("/");
      dispatch(setUserId(user.user.uid));
      setLocalStorage("userId", user.user.uid);
    } catch (error) {
      setErrorText(getErrorMessage(error));
    }
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
