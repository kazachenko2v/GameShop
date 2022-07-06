import React from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../redux/store";
import { setFilters } from "../../redux/filter/slice";
import { getFilter } from "../../redux/filter/selectors";
import { IFilterSliceState, TSearchParams } from "../../redux/filter/types";

import { fetchGames } from "../../redux/games/slice";
import { getGames } from "../../redux/games/selectors";

import PlatformsList from "../../components/PlatsormsList";
import SortPanel from "../../components/SortPanel";
import GameCard from "../../components/GameCard";
import GameCardSkeleton from "../../components/GameCardSkeleton";
import Pagination from "../../components/Pagination";

import {
  GAMES_LIST_KEY_ID_PAGE_SIZE_PAGE_SIZE_COUNT_20,
  PAGE,
  PARENT_PLATFORMS,
  PAGE_SIZE_COUNT_20,
} from "../../constants";

import styles from "./Main.module.css";

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();

  const { results: games, count: gamesCount, status } = useSelector(getGames);
  const { page, platformsId, search } = useSelector(getFilter);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          page,
          parent_platforms: platformsId,
          search,
        },
        {
          arrayFormat: "comma",
          filter: (prefix, value) => {
            if (prefix === "search" && value === "") {
              return;
            }
            return value;
          },
        }
      );
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [page, platformsId, search]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as TSearchParams;
      const trueTypeParams: IFilterSliceState = {
        page: Number(params.page),
        platformsId: params.parent_platforms
          .split(",")
          .map((item: string) => Number(item)),
        search: params.search ? params.search : "",
      };
      dispatch(setFilters(trueTypeParams));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    const searchValue = search ? `&search=${search}` : "";
    if (!isSearch.current) {
      appDispatch(
        fetchGames(
          GAMES_LIST_KEY_ID_PAGE_SIZE_PAGE_SIZE_COUNT_20 +
            PAGE +
            page +
            PARENT_PLATFORMS +
            platformsId +
            searchValue
        )
      );
    }
    isSearch.current = false;
  }, [page, platformsId, search]);

  return (
    <>
      <div className={styles.filter_container}>
        <PlatformsList platformsId={platformsId} />
      </div>
      <SortPanel search={search} platformsId={platformsId} />
      <div className={styles.main_conteiner}>
        {status === "loading"
          ? [...new Array(PAGE_SIZE_COUNT_20)].map((_, index) => (
              <GameCardSkeleton key={index} />
            ))
          : games.map((item) => <GameCard key={item.id} item={item} />)}
      </div>
      <Pagination currentPage={page} gamesCount={gamesCount} status={status} />
    </>
  );
};

export default Main;
