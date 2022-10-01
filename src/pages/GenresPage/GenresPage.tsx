import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GamesList, Pagination } from "../../components";
import { useResetPageWhenUnmount } from "../../hooks/useResetPageWhenUnmount";
import { getFilter } from "../../redux/filter/selectors";
import {
  useGetGamesQuery,
  useGetGenreQuery,
} from "../../redux/games/games.api";

import styles from "./GenresPage.module.css";
import { useMediaQuery } from "react-responsive";
import { TABLET } from "../../constants";

const GenresPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ maxWidth: TABLET });
  const { page } = useSelector(getFilter);
  const descriptionRef = React.useRef<HTMLDivElement | null>(null);
  const isMounted = React.useRef(false);

  const { data: genres, isSuccess: genresSuccess } = useGetGenreQuery(
    Number(id)
  );

  useResetPageWhenUnmount();

  const {
    data: games,
    isSuccess: gamesSuccess,
    isLoading: gamesLoading,
    isError: gamesError,
  } = useGetGamesQuery([20, `&genres=${id}&page=${page}`]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        page,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [page]);

  React.useEffect(() => {
    if (genresSuccess && !isTablet) {
      let doc = new DOMParser().parseFromString(
        genres.description,
        "text/html"
      );
      descriptionRef.current &&
        descriptionRef.current.prepend(doc.body.firstChild!);
    }
  }, [genresSuccess]);

  return (
    <>
      {genresSuccess && (
        <div className={styles.image__container}>
          <h1 className={styles.title}>{genres.name}</h1>
          <div
            className={styles.description__container}
            ref={descriptionRef}
          ></div>
          <img className={styles.image} src={genres.image_background} alt="" />
        </div>
      )}
      <GamesList
        games={games}
        isSuccess={gamesSuccess}
        isLoading={gamesLoading}
        isError={gamesError}
      />
      {gamesSuccess && (
        <Pagination currentPage={page} gamesCount={games.count} />
      )}
    </>
  );
};

export default GenresPage;
