import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

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

  const { data: sliderGames, isSuccess: isSuccessSlider } = useGetGamesQuery(
    [10, date],
    {
      skip: date.length === 0,
    }
  );

  const { data, isLoading, isSuccess } = useGetGenresQuery();

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
      <Slider {...settings}>
        {isSuccessSlider &&
          sliderGames.results.map((game) => (
            <Link key={game.id} to={"/" + game.id}>
              <div key={game.id} className={styles.slide}>
                <img className={styles.image} src={game.background_image}></img>
                <div className={styles.title__container}>
                  <h1 className={styles.title}>{game.name}</h1>
                </div>
              </div>
            </Link>
          ))}
      </Slider>
      <section className={styles.genres__container}>
        <h1 className={styles.genres__title}>Genres</h1>
        <ul className={styles.genres__list}>
          {isSuccess &&
            data.map((genre) => (
              <Link key={genre.id} to={"/genres/" + genre.id}>
                <li className={styles.genres__item}>
                  <img
                    className={styles.genres__image}
                    src={genre.image_background}
                    alt=""
                  />
                  <div className={styles.title__container}>
                    <h2 className={styles.title}>{genre.name}</h2>
                  </div>
                </li>
              </Link>
            ))}
        </ul>
      </section>
    </div>
  );
};

export default Main;
