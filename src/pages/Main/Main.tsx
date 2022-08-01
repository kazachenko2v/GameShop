import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { useGetGamesQuery } from "../../redux/games/games.api";
import { arrDateToString, dateToString } from "../../utils/stringToDate";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Main.module.css";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Main = () => {
  const [date, setDate] = useState<string>("");
  useEffect(() => {
    var d = new Date();
    d.setMonth(d.getMonth() - 1);

    setDate(`&dates=${arrDateToString([d, new Date()])}`);
  }, []);

  const isTablet = useMediaQuery({ maxWidth: 912 });

  const { data, isLoading, isSuccess } = useGetGamesQuery([10, date], {
    skip: date.length === 0,
  });

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
        {isSuccess &&
          data.results.map((game) => (
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
    </div>
  );
};

export default Main;
