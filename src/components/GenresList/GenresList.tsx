import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { ImageWithLoader } from "..";
import { useGetGenresQuery } from "../../redux/games/games.api";

import styles from "./GenresList.module.css";

const GenresList: React.FC = () => {
  const { data, isLoading, isSuccess } = useGetGenresQuery();

  return (
    <section id="genres" className={styles.genres__container}>
      <h1 className={styles.genres__title}>Genres</h1>
      <div className={styles.genres__list}>
        {isLoading &&
          [...new Array(20)].map((_, index) => (
            <Skeleton key={index} className={styles.genres__item} />
          ))}
        {isSuccess &&
          data.results.map((genre) => (
            <Link key={genre.id} to={"/genres/" + genre.id}>
              <div className={styles.genres__item}>
                <div className={styles.genres__image_container}>
                  <ImageWithLoader
                    image={genre.image_background}
                    name={genre.name}
                  />
                </div>
                <div className={styles.title__container}>
                  <h2 className={styles.title}>{genre.name}</h2>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default GenresList;
