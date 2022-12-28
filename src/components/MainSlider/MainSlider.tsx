import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import Skeleton from "react-loading-skeleton";

import { ImageWithLoader } from "..";
import { useGetGamesQuery } from "../../redux/games/games.api";
import getLastMonth from "../../utils/getLastMonth";
import { TABLET } from "../../constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./MainSlider.module.css";

const MainSlider: React.FC = () => {
  const date = getLastMonth(1);
  const isTablet = useMediaQuery({ maxWidth: TABLET });

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
    <>
      {isLoading ? (
        <Skeleton className={styles.slide} />
      ) : (
        <Slider className={styles.slider} {...settings}>
          {isSuccess &&
            data.results.map((game) => (
              <Link key={game.id} to={"/" + game.id}>
                <div className={styles.slide}>
                  <div className={styles.img_container}>
                    <ImageWithLoader
                      image={game.background_image}
                      name={game.name}
                    />
                  </div>
                  <div className={styles.title__container}>
                    <h1 className={styles.title}>{game.name}</h1>
                  </div>
                </div>
              </Link>
            ))}
        </Slider>
      )}
    </>
  );
};

export default MainSlider;
