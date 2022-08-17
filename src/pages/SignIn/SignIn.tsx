import React from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../firebase";

import { getErrorMessage } from "../../utils/getErrorMessage";

import styles from "./SignIn.module.css";

const SignIn: React.FC = () => {
  const [errorText, setErrorText] = React.useState<string>("");
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const singInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(data.email, data.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setErrorText(getErrorMessage(error));
      });
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
          />
        </label>
        <button type="submit" className={styles.button}>
          Ok
        </button>
      </form>
      {errorText && <p className={styles.error}>{errorText}</p>}
      <span className={styles.text}>Don't want to link this account?</span>{" "}
      <button
        className={styles.link}
        onClick={() => navigate("/creacteaccount")}
      >
        Sign in.
      </button>
    </div>
  );
};

export default SignIn;
