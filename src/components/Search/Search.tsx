import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchQuery } from "../../redux/filter/slice";
import { TGamesItem } from "../../redux/games/types";

import { fetchGames } from "../../utils/fetching";
import _debounce from "lodash.debounce";

import styles from "./Search.module.css";
import cn from "classnames";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<string>("");
  const [games, setGames] = React.useState<TGamesItem[] | null>(null);
  const [isAcite, setIsAcite] = React.useState<boolean>(false);

  const dropDownRef = React.useRef<HTMLDivElement>(null);
  const linkRef = React.useRef<HTMLUListElement>(null);

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    fetchGames(e.target.value, setGames);
  };
  const debounce = _debounce(updateValue, 300);

  const clickHandler = (value: string) => {
    localStorage.setItem("search", value);
    dispatch(setSearchQuery(value));
  };

  React.useEffect(() => {
    const handleClickOutsideSeacrh = (event: MouseEvent) => {
      if (
        // when you click outside of the dropdown menu...
        (dropDownRef.current &&
          !event.composedPath().includes(dropDownRef.current)) ||
        // ...or on one of the links...
        (linkRef.current && event.composedPath().includes(linkRef.current))
      ) {
        // ...its dropdown menu closes
        setIsAcite(false);
      } else {
        setIsAcite(true);
      }
    };
    document.body.addEventListener("click", handleClickOutsideSeacrh);
    return () =>
      document.body.removeEventListener("click", handleClickOutsideSeacrh);
  }, []);

  return (
    <div ref={dropDownRef} className={styles.container}>
      <label className={styles.seacrh_container}>
        <input
          onChange={debounce}
          className={styles.search_input}
          type="text"
        />
        <button onClick={() => clickHandler(value)} className={styles.button}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 7.5C0 11.6421 3.35786 15 7.5 15C9.23164 15 10.8262 14.4131 12.0957 13.4275C12.1435 13.5286 12.2092 13.6234 12.2929 13.7071L18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L13.7071 12.2929C13.6234 12.2092 13.5286 12.1435 13.4275 12.0957C14.4131 10.8262 15 9.23164 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5ZM2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5C13 10.5376 10.5376 13 7.5 13C4.46243 13 2 10.5376 2 7.5Z"
              fill="#91969B"
            />
          </svg>
        </button>
      </label>
      {games && (
        <div
          className={cn(styles.dropdown, {
            [styles.dropdown_acive]: isAcite,
            [styles.dropdown_deacive]: !isAcite,
          })}
        >
          <ul ref={linkRef}>
            {games.length ? (
              games.map((game) => (
                <Link to={"/" + game.id} key={game.id}>
                  <li className={styles.dropdown__item}>
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className={styles.image}
                    />
                    <span>{game.name}</span>
                  </li>
                </Link>
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
