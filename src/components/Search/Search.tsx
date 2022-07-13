import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../redux/filter/slice";
import { TGamesItem } from "../../redux/games/types";

import { fetchGames } from "../../utils/fetching";
import _debounce from "lodash.debounce";

import styles from "./Search.module.css";
import cn from "classnames";

interface SeacrhProp {
  setIsOpenMenu?: (qwe: boolean) => void;
}

const Search: React.FC<SeacrhProp> = ({ setIsOpenMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleClickOnLink = React.useCallback(
    (id: number) => {
      navigate(`/${id}`, { replace: true });
      setIsOpenMenu && setIsOpenMenu(false);
    },
    [navigate]
  );

  React.useEffect(() => {
    const handleClickOutsideSeacrh = (event: MouseEvent): void => {
      if (
        /* when you click outside of the dropdown menu... */
        (dropDownRef.current &&
          !dropDownRef.current.contains(event.target as Node)) ||
        /* ...or on one of the links... */
        (linkRef.current && linkRef.current.contains(event.target as Node))
      ) {
        /* ...its dropdown menu closes */
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
          <ul ref={linkRef}>
            {games.length ? (
              games.map((game) => (
                // <Link to={"/" + game.id} key={game.id}>
                <li
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
                // </Link>
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
