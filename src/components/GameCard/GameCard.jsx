import React from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import styles from "./GameCard.module.css";

const GameCard = ({ item }) => {
  const initialPlatforms = [1, 2, 3, 4, 8];
  const dispatch = useDispatch();
  return (
    <>
      <div className={styles.item_container}>
        <Link to={`/${item.id}`}>
          <img
            className={styles.img}
            src={item.background_image}
            alt={item.name}
          />
          <p className={styles.prices}>$ 49.99</p>
          <h3 className={styles.title}>{item.name}</h3>
          <p className={styles.platform_container}>
            {item.parent_platforms.map(
              (platform) =>
                initialPlatforms.includes(platform.platform.id) && (
                  <span
                    className={styles.platform_item}
                    key={platform.platform.id}
                  >
                    {platform.platform.name}
                  </span>
                )
            )}
          </p>
        </Link>
      </div>
    </>
  );
};

export default GameCard;
