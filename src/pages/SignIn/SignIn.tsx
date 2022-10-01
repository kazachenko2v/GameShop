import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { signIn } from "../../firebase";

import { setUid } from "../../redux/auth/slice";

import { getErrorMessage } from "../../utils/getErrorMessage";
import { setLocalStorage } from "../../utils/localStorage";

import styles from "./SignIn.module.css";

const SignIn: React.FC = () => {
  const [errorText, setErrorText] = React.useState<string>("");
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const singInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(data.email, data.password)
      .then((user) => {
        navigate("/");
        setLocalStorage("uid", user.user.uid);
        dispatch(setUid(user.user.uid));
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
      <h1 className={styles.title}>Sign In</h1>
      <form onSubmit={singInHandler}>
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
          />
        </label>
        <button type="submit" className={styles.button}>
          Ok
        </button>
      </form>
      {errorText && <p className={styles.error}>{errorText}</p>}
      <span className={styles.text}>Don't have an Account?</span>{" "}
      <button
        className={styles.link}
        onClick={() => navigate("/creacteaccount")}
      >
        Sign up.
      </button>
    </div>
  );
};

export default SignIn;
