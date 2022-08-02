import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getFilter } from "../../redux/filter/selectors";
import { useGetGamesQuery } from "../../redux/games/games.api";
import { useSearchParams } from "../../hooks/useSearchParams";
import CalendarContextProvider from "../../contexts/FilterContext/FilterContextProvider";

import { PAGE_SIZE_COUNT_20 } from "../../constants";
import {
  SortContainer,
  SortPanel,
  GameCard,
  GameCardSkeleton,
  Pagination,
} from "../../components";

import styles from "./AllGames.module.css";

const AllGames: React.FC = () => {
  const navigate = useNavigate();

  const isMounted = React.useRef(false);

  const { page, platformsId, genresId, tagsId, search, dates } =
    useSelector(getFilter);

  const state = useSearchParams([
    page,
    platformsId,
    genresId,
    tagsId,
    search,
    dates,
  ]);

  const { data, isLoading, isSuccess } = useGetGamesQuery(
    [PAGE_SIZE_COUNT_20, state],
    { skip: state === "" }
  );

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          page,
          parent_platforms: platformsId,
          genres: genresId,
          tags: tagsId,
          search,
          dates,
        },
        {
          arrayFormat: "comma",
          filter: (prefix, value) => {
            if (
              (prefix === "search" && value === "") ||
              (prefix === "dates" && value === "") ||
              (prefix === "parent_platforms" && value === "") ||
              (prefix === "genres" && value === "") ||
              (prefix === "tags" && value === "")
            ) {
              return;
            }
            return value;
          },
        }
      );
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [page, platformsId, genresId, tagsId, search, dates]);

  return (
    <>
      <CalendarContextProvider>
        <SortContainer
          page={page}
          search={search}
          platformsId={platformsId}
          genresId={genresId}
          tagsId={tagsId}
          dates={dates}
        />
        <SortPanel
          search={search}
          platformsId={platformsId}
          genresId={genresId}
          tagsId={tagsId}
          dates={dates}
        />
      </CalendarContextProvider>
      <div className={styles.conteiner}>
        {isLoading &&
          [...new Array(PAGE_SIZE_COUNT_20)].map((_, index) => (
            <GameCardSkeleton key={index} />
          ))}
        {isSuccess &&
          data.results.map((item) => <GameCard key={item.id} item={item} />)}
      </div>
      {isSuccess && (
        <Pagination
          currentPage={page}
          gamesCount={data.count}
          isSuccess={isSuccess}
        />
      )}
    </>
  );
};

export default AllGames;
