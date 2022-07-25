import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { setSearchQuery } from "../../redux/filter/slice";
import { TGamesItem } from "../../redux/games/types";

import { useClickOutside } from "../../hooks";
import { fetchGames } from "../../utils/fetching";
import _debounce from "lodash.debounce";

import styles from "./Search.module.css";
import cn from "classnames";

import { SeacrhProp } from "../types";

const Search: React.FC<SeacrhProp> = ({ setIsOpenMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ maxWidth: 912 });

  const [value, setValue] = React.useState<string>("");
  const [games, setGames] = React.useState<TGamesItem[] | null>(null);
  const [isAcite, setIsAcite] = React.useState<boolean>(false);

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    fetchGames(e.target.value, setGames);
  };
  const debounce = _debounce(updateValue, 300);

  const clickHandler = (value: string) => {
    localStorage.setItem("search", value);
    dispatch(setSearchQuery(value));
    isTablet && setIsOpenMenu(false);
  };

  const handleClickOnLink = (id: number) => {
    navigate(`/${id}`, { replace: true });
    setIsAcite(false);
    isTablet && setIsOpenMenu(false);
  };

  const dropDownRef = useClickOutside(() => setIsAcite(false));

  return (
    <div ref={dropDownRef} className={styles.container}>
      <label className={styles.seacrh_container}>
        <input
          onChange={debounce}
          onFocus={() => setIsAcite(true)}
          className={styles.search_input}
          type="text"
        />
        <button
          onClick={() => clickHandler(value)}
          className={styles.button}
        ></button>
      </label>
      {games && (
        <div
          className={cn(styles.dropdown, {
            [styles.dropdown_acive]: isAcite,
            [styles.dropdown_deacive]: !isAcite,
          })}
        >
          <ul>
            {games.length ? (
              games.map((game) => (
                <li
                  key={game.id}
                  className={styles.dropdown__item}
                  onClick={() => handleClickOnLink(game.id)}
                >
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className={styles.image}
                  />
                  <span>{game.name}</span>
                </li>
              ))
            ) : (
              <span>NotFound</span>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
