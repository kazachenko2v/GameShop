import React from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getFilter } from "../../redux/filter/selectors";
import { useGetGamesQuery } from "../../redux/games/games.api";
import { useSearchParams } from "../../hooks/useSearchParams";
import { useResetPageWhenUnmount } from "../../hooks/useResetPageWhenUnmount";
import FilterContextProvider from "../../contexts/FilterContext/FilterContextProvider";

import { PAGE_SIZE_COUNT_20 } from "../../constants";
import {
  FiltersContainer,
  SortPanel,
  Pagination,
  GamesList,
} from "../../components";

const AllGames: React.FC = () => {
  const navigate = useNavigate();

  const isMounted = React.useRef(false);

  const { page, platformsId, genresId, tagsId, search, dates } =
    useSelector(getFilter);

  const searchParams = useSearchParams({
    page,
    platformsId,
    genresId,
    tagsId,
    search,
    dates,
  });

  const {
    data: games,
    isLoading,
    isSuccess,
    isError,
  } = useGetGamesQuery([PAGE_SIZE_COUNT_20, searchParams], {
    skip: searchParams === "",
  });

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

  useResetPageWhenUnmount();

  return (
    <>
      <FilterContextProvider>
        <FiltersContainer
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
      </FilterContextProvider>
      <GamesList
        games={games}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
      {isSuccess && <Pagination currentPage={page} gamesCount={games.count} />}
    </>
  );
};

export default AllGames;
