import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TListId } from "../../redux/filter/types";
import { setGenresId } from "../../redux/filter/slice";
import { getFilter } from "../../redux/filter/selectors";

import { DropDown, PlatformsListItem } from "../";
import { arraysComparing } from "../../utils/dropDown";
import { setLocalStorage } from "../../utils/localStorage";

import { useClickOutside } from "../../hooks";

import {
  FilterContext,
  IFilterContextInterface,
} from "../../contexts/FilterContext/FilterContext";
import { getGenres } from "../../redux/genres/selectors";

const GenresList: React.FC<{
  isTablet: boolean;
}> = ({ isTablet }) => {
  const dispatch = useDispatch();
  const { genresId } = useSelector(getFilter);
  const { results: allGenres, status } = useSelector(getGenres);
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const { selectedGenres, setValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;
  const selectedPlatformsRef = React.useRef<TListId | null>(null);
  const startPlatformsRef = React.useRef<TListId | null>(null);
  selectedPlatformsRef.current = [...selectedGenres.value];
  startPlatformsRef.current = [...genresId];

  const sortAndCompareArrays = () => {
    const sortedSelectedPlatformsRef = selectedPlatformsRef.current!.sort(
      (a, b) => a - b
    );
    const toUpdate = arraysComparing(
      startPlatformsRef.current!,
      sortedSelectedPlatformsRef
    );
    if (toUpdate) {
      !isTablet
        ? dispatch(setGenresId(toUpdate))
        : setValue((prevState) => {
            return { ...prevState, selectedGenres: toUpdate };
          });
      setLocalStorage("genresId", toUpdate);
    }
  };

  const buttonOnClickHandler = () => {
    if (isActive) {
      sortAndCompareArrays();
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const togglePlatforms = (id: number) => {
    if (selectedGenres.value.includes(id)) {
      const newArr: any = [...selectedGenres.value].filter(
        (item) => item !== id
      );
      setValue((prevState) => {
        return { ...prevState, selectedGenres: newArr };
      });
    } else if (!selectedGenres.value.includes(id)) {
      const newArr: any = [];
      newArr.push(id);
      setValue((prevState) => {
        return {
          ...prevState,
          selectedGenres: selectedGenres.value.concat(newArr),
        };
      });
    }
  };

  const dropDownRef = useClickOutside(() => {
    sortAndCompareArrays();
    setIsActive(false);
  });

  return (
    <DropDown
      value={"Genres"}
      isActive={isActive}
      dropDownRef={dropDownRef}
      buttonOnClickHandler={buttonOnClickHandler}
    >
      <ul>
        {status === "loading" ? (
          <span>No genres, sorry</span>
        ) : (
          allGenres.map((item) => (
            <li key={item.id}>
              <PlatformsListItem
                item={item}
                isActiveMenu={isActive}
                togglePlatforms={togglePlatforms}
                platformsId={selectedGenres.value}
              />
            </li>
          ))
        )}
      </ul>
    </DropDown>
  );
};

export default GenresList;
