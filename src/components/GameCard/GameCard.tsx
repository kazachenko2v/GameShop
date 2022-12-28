import React from "react";

import { Link } from "react-router-dom";
import { ImageWithLoader } from "..";
import { GameCardProps } from "../types";

import styles from "./GameCard.module.css";

const GameCard: React.FC<GameCardProps> = ({ item }) => {
  return (
    <>
      <div className={styles.item_container}>
        <Link to={"/" + item.id}>
          <div className={styles.img_container}>
            <ImageWithLoader image={item.background_image} name={item.name} />
          </div>
          <p className={styles.prices}>$ 49.99</p>
          <h3 className={styles.title}>{item.name}</h3>
          <p className={styles.platform_container}>
            {item.parent_platforms.map((platform) => (
              <span className={styles.platform_item} key={platform.platform.id}>
                {platform.platform.name}
              </span>
            ))}
          </p>
        </Link>
      </div>
    </>
  );
};

export default GameCard;
