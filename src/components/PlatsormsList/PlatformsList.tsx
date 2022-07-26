import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TListId } from "../../redux/filter/types";
import { getFilter } from "../../redux/filter/selectors";
import { setPlatformsId } from "../../redux/filter/slice";

import { DropDown, PlatformsListItem } from "../";
import { ALL_PLATFORMS } from "../../constants";
import { arraysComparing } from "../../utils/dropDown";
import { setLocalStorage } from "../../utils/localStorage";
import { useClickOutside } from "../../hooks";

import {
  FilterContext,
  IFilterContextInterface,
} from "../../contexts/FilterContext/FilterContext";

const PlatformsList: React.FC<{
  isTablet: boolean;
}> = ({ isTablet }) => {
  const dispatch = useDispatch();
  const { platformsId } = useSelector(getFilter);
  const { platforms, setValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;
  const selectedPlatformsRef = React.useRef<TListId | null>(null);
  const startPlatformsRef = React.useRef<TListId | null>(null);
  selectedPlatformsRef.current = [...platforms.value];
  startPlatformsRef.current = [...platformsId];
  const [isActive, setIsActive] = React.useState<boolean>(false);

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
        ? dispatch(setPlatformsId(toUpdate))
        : setValue((prevState) => {
            return { ...prevState, platforms: toUpdate };
          });
      setLocalStorage("platformsId", toUpdate);
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
    if (platforms.value.includes(id)) {
      const newArr: any = [...platforms.value].filter((item) => item !== id);
      setValue((prevState) => {
        return { ...prevState, platforms: newArr };
      });
    } else if (!platforms.value.includes(id)) {
      const newArr: any = [];
      newArr.push(id);
      setValue((prevState) => {
        return { ...prevState, platforms: platforms.value.concat(newArr) };
      });
    }
  };

  const dropDownRef = useClickOutside(() => {
    sortAndCompareArrays();
    setIsActive(false);
  });

  return (
    <DropDown
      value={"Platfotms"}
      isActive={isActive}
      dropDownRef={dropDownRef}
      buttonOnClickHandler={buttonOnClickHandler}
    >
      <ul>
        {ALL_PLATFORMS.map((item) => (
          <li key={item.id}>
            <PlatformsListItem
              item={item}
              isActiveMenu={isActive}
              togglePlatforms={togglePlatforms}
              platformsId={platforms.value}
            />
          </li>
        ))}
      </ul>
    </DropDown>
  );
};

export default PlatformsList;
