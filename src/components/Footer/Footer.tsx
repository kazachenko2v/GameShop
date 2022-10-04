import React from "react";
import { useNavigate } from "react-router";

import { useAuthListen } from "../../hooks/useGetDataFromDatabase";
import { signOutCustom } from "../../firebase";

import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = useAuthListen();

  return <footer className={styles.container}></footer>;
};

export default Footer;
