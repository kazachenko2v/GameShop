import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Skeleton from "react-loading-skeleton";

import {
  useGetGamesQuery,
  useGetGenresQuery,
} from "../../redux/games/games.api";
import { arrDateToString } from "../../utils/stringToDate";
import { TABLET } from "../../constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Main.module.css";

const Main: React.FC = () => {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    var d = new Date();
    d.setMonth(d.getMonth() - 1);

    setDate(`&dates=${arrDateToString([d, new Date()])}`);
  }, []);

  const isTablet = useMediaQuery({ maxWidth: TABLET });

  const {
    data: sliderGames,
    isLoading: isLoadingSlider,
    isSuccess: isSuccessSlider,
  } = useGetGamesQuery([10, date], {
    skip: date.length === 0,
  });

  const {
    data: genres,
    isLoading: isLoadingGenres,
    isSuccess: isSuccessGenres,
  } = useGetGenresQuery();

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    accessibility: true,
    dots: true,
    arrows: isTablet ? false : true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.container}>
      {isLoadingSlider ? (
        <Skeleton className={styles.slide} />
      ) : (
        <Slider className={styles.slider} {...settings}>
          {isSuccessSlider &&
            sliderGames.results.map((game) => (
              <Link key={game.id} to={"/" + game.id}>
                <div className={styles.slide}>
                  <img
                    className={styles.image}
                    src={game.background_image}
                  ></img>
                  <div className={styles.title__container}>
                    <h1 className={styles.title}>{game.name}</h1>
                  </div>
                </div>
              </Link>
            ))}
        </Slider>
      )}
      <section id="genres" className={styles.genres__container}>
        <h1 className={styles.genres__title}>Genres</h1>
        <div className={styles.genres__list}>
          {isLoadingGenres &&
            [...new Array(20)].map((_, index) => (
              <Skeleton key={index} className={styles.genres__item} />
            ))}
          {isSuccessGenres &&
            genres.results.map((genre) => (
              <Link key={genre.id} to={"/genres/" + genre.id}>
                <div className={styles.genres__item}>
                  <img
                    className={styles.genres__image}
                    src={genre.image_background}
                    alt="Genres"
                  />
                  <div className={styles.title__container}>
                    <h2 className={styles.title}>{genre.name}</h2>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Main;
