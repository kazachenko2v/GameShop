import React from "react";
import Skeleton from "react-loading-skeleton";
import errorLoadingImg from "../../assets/images/errorLoadingImg.jpg";

import { ImageWithLoaderProp } from "../types";

import cn from "classnames";
import styles from "./ImageWithLoader.module.css";

const ImageWithLoader: React.FC<ImageWithLoaderProp> = ({ image, name }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <>
      {image === null ? (
        <img
          className={cn(styles.image, styles.image_loaded)}
          src={errorLoadingImg}
          alt={name}
        />
      ) : (
        <>
          {isLoading ? <Skeleton className={styles.skeleton} /> : null}
          <img
            className={cn(styles.image, !isLoading && styles.image_loaded)}
            src={image}
            alt={name}
            onLoad={() => setIsLoading(false)}
          />
        </>
      )}
    </>
  );
};

export default ImageWithLoader;
