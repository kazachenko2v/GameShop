import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { useGetGamesQuery } from "../../redux/games/games.api";
import { arrDateToString, dateToString } from "../../utils/stringToDate";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Main.module.css";

const Main = () => {
  const [date, setDate] = useState<string>("");
  useEffect(() => {
    var d = new Date();
    d.setMonth(d.getMonth() - 1);

    setDate(`&dates=${arrDateToString([d, new Date()])}`);
  }, []);

  const { data, isLoading, isSuccess } = useGetGamesQuery([10, date], {
    skip: date.length === 0,
  });
  console.log(date);
  console.log(data);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {isSuccess &&
          data.results.map((game) => (
            <div key={game.id} className={styles.slide}>
              <h1>{game.name}</h1>
              <img className={styles.image} src={game.background_image}></img>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default Main;
