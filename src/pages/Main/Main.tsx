import React from "react";

import { GenresList, MainSlider } from "../../components";

import styles from "./Main.module.css";

const Main: React.FC = () => {
  return (
    <div className={styles.container}>
      <MainSlider />
      <GenresList />
    </div>
  );
};

export default Main;
