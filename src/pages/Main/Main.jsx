import React from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setFilters } from "../../redux/slices/filterSlice";
import { fetchGames } from "../../redux/slices/gamesSlice";

import GameCard from "../../components/GameCard";
import GameCardSkeleton from "../../components/GameCardSkeleton";
import PlatformsList from "../../components/PlatsormsList";
import Pagination from "../../components/Pagination";

import {
  GAMES_LIST_KEY_ID_PAGE_SIZE_PAGE_SIZE_COUNT,
  PAGE,
  PARENT_PLATFORMS,
  PAGE_SIZE_COUNT,
} from "../../constants";

import styles from "./Main.module.css";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { games, gamesCount, status } = useSelector((state) => state.games);
  const { page, platformsId, search } = useSelector((state) => state.filter);
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
      let params = qs.parse(window.location.search.substring(1));
      params.parent_platforms = params.parent_platforms
        .split(",")
        .map((item) => Number(item));
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    const searchValue = search ? `&search=${search}` : "";
    if (!isSearch.current) {
      dispatch(
        fetchGames(
          GAMES_LIST_KEY_ID_PAGE_SIZE_PAGE_SIZE_COUNT +
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
        <PlatformsList />
      </div>
      <div className={styles.main_conteiner}>
        {status === "loading"
          ? [...new Array(PAGE_SIZE_COUNT)].map((_, index) => (
              <GameCardSkeleton key={index} />
            ))
          : games.map((item) => <GameCard key={item.id} item={item} />)}
      </div>
      <Pagination currentPage={page} gamesCount={gamesCount} status={status} />
    </>
  );
};

export default Main;
