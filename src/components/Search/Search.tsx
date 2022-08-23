import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import _debounce from "lodash.debounce";
import Skeleton from "react-loading-skeleton";

import {
  FilterContext,
  IFilterContextInterface,
  TFilterContext,
} from "../../contexts/FilterContext/FilterContext";
import { setSearchQuery } from "../../redux/filter/slice";
import { useGetGamesQuery } from "../../redux/games/games.api";
import { useClickOutside } from "../../hooks/useClickOutside";
import { PAGE_SIZE_COUNT_5 } from "../../constants";
import { setLocalStorage } from "../../utils/localStorage";

import styles from "./Search.module.css";
import cn from "classnames";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTablet = useMediaQuery({ maxWidth: 912 });
  const [value, setValue] = React.useState<string>("");
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { setContextValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;

  const {
    data: games,
    isSuccess,
    isLoading,
    isError,
  } = useGetGamesQuery([PAGE_SIZE_COUNT_5, `&search=${value}`], {
    skip: value.length === 0,
  });

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearValue = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setValue("");
  };

  const debounceOnChange = _debounce(updateValue, 300);

  const clickHandler = (value: string) => {
    setLocalStorage("search", value);
    setIsActive(false);
    if (!isTablet) {
      dispatch(setSearchQuery(value));
    } else {
      setContextValue((prevState: TFilterContext) => {
        return {
          ...prevState,
          searchContext: value,
        };
      });
    }
  };

  const handleClickOnLink = (id: number) => {
    navigate(`/${id}`, { replace: true });
    setIsActive(false);
  };

  const dropDownRef = useClickOutside(() => setIsActive(false));

  return (
    <div className={styles.container}>
      <div ref={dropDownRef} className={styles.dropdown_container}>
        <label className={styles.label}>
          <input
            ref={inputRef}
            onChange={debounceOnChange}
            onFocus={() => setIsActive(true)}
            className={styles.input}
            type="text"
          />
          {value.length > 0 && (
            <button
              onClick={clearValue}
              className={styles.button_remove}
            ></button>
          )}
          <button
            onClick={() => clickHandler(value)}
            className={styles.button}
          ></button>
        </label>
        {isError && <span>Sorry, something went wrong...</span>}
        {isLoading && (
          <div
            className={cn(styles.dropdown, {
              [styles.dropdown_acive]: isActive,
              [styles.dropdown_deacive]: !isActive,
            })}
          >
            <ul>
              {[...new Array(PAGE_SIZE_COUNT_5)].map((_, index) => (
                <Skeleton key={index} className={styles.skeleton} />
              ))}
            </ul>
          </div>
        )}
        {isSuccess && (
          <div
            className={cn(styles.dropdown, {
              [styles.dropdown_acive]: isActive,
              [styles.dropdown_deacive]: !isActive,
            })}
          >
            <ul>
              {games.results.length ? (
                games.results.map((game) => (
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
    </div>
  );
};

export default Search;
