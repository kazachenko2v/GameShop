import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterContext,
  IFilterContextInterface,
} from "../../contexts/FilterContext/FilterContext";
import { useClickOutside } from "../../hooks";
import { getFilter } from "../../redux/filter/selectors";
import { setTagsId } from "../../redux/filter/slice";
import { TListId } from "../../redux/filter/types";
import { useGetTagsQuery } from "../../redux/filtes.api";
import { arraysComparing } from "../../utils/dropDown";
import { setLocalStorage } from "../../utils/localStorage";
import DropDown from "../DropDown/DropDown";
import PlatformsListItem from "../PlatformsListItem/PlatformsListItem";

const TagsList: React.FC<{
  isTablet: boolean;
}> = ({ isTablet }) => {
  const dispatch = useDispatch();
  const { genresId } = useSelector(getFilter);
  const { isLoading, isError, data: allTags, isSuccess } = useGetTagsQuery();
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const { selectedTags, setValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;
  const selectedPlatformsRef = React.useRef<TListId | null>(null);
  const startPlatformsRef = React.useRef<TListId | null>(null);
  selectedPlatformsRef.current = [...selectedTags.value];
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
        ? dispatch(setTagsId(toUpdate))
        : setValue((prevState) => {
            return { ...prevState, selectedTags: toUpdate };
          });
      setLocalStorage("tagsId", toUpdate);
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
    if (selectedTags.value.includes(id)) {
      const newArr: any = [...selectedTags.value].filter((item) => item !== id);
      setValue((prevState) => {
        return { ...prevState, selectedTags: newArr };
      });
    } else if (!selectedTags.value.includes(id)) {
      const newArr: any = [];
      newArr.push(id);
      setValue((prevState) => {
        return {
          ...prevState,
          selectedTags: selectedTags.value.concat(newArr),
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
      value={"Tags"}
      isActive={isActive}
      dropDownRef={dropDownRef}
      buttonOnClickHandler={buttonOnClickHandler}
    >
      <ul>
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          isSuccess &&
          allTags.map((item) => (
            <li key={item.id}>
              <PlatformsListItem
                item={item}
                isActiveMenu={isActive}
                togglePlatforms={togglePlatforms}
                platformsId={selectedTags.value}
              />
            </li>
          ))
        )}
      </ul>
    </DropDown>
  );
};

export default TagsList;
