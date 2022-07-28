import React from "react";
import { useDispatch } from "react-redux";
import { TListId } from "../../redux/filter/types";

import { DropDown, DropdownListItem } from "..";
import { arraysComparing } from "../../utils/dropDown";
import { setLocalStorage } from "../../utils/localStorage";
import { useClickOutside } from "../../hooks";
import { DropdownListProps } from "../types";
import { TFilterContext } from "../../contexts/FilterContext/FilterContext";

const DropdownList: React.FC<DropdownListProps> = ({
  isTablet,
  startItems,
  selectedItems,
  setValue,
  setItemsIdtoState,
  value,
  allItemConstant,
}) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const selectedItemsRef = React.useRef<TListId | null>(null);
  const startItemsRef = React.useRef<TListId | null>(null);
  selectedItemsRef.current = [...selectedItems];
  startItemsRef.current = [...startItems];

  const sortAndCompareArrays = () => {
    const sortedSelectedItemsRef = selectedItemsRef.current!.sort(
      (a, b) => a - b
    );
    const toUpdate = arraysComparing(
      startItemsRef.current!,
      sortedSelectedItemsRef
    );
    if (toUpdate) {
      !isTablet
        ? dispatch(setItemsIdtoState(toUpdate))
        : setValue((prevState: TFilterContext) => {
            console.log(prevState);
            return { ...prevState, [value]: toUpdate };
          });
      setLocalStorage(value, toUpdate);
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
    if (selectedItems.includes(id)) {
      setValue((prevState: TFilterContext) => {
        return {
          ...prevState,
          [value]: [...selectedItems].filter((item) => item !== id),
        };
      });
    } else if (!selectedItems.includes(id)) {
      setValue((prevState: TFilterContext) => {
        return { ...prevState, [value]: [...selectedItems, id] };
      });
    }
  };

  const dropDownRef = useClickOutside(() => {
    sortAndCompareArrays();
    setIsActive(false);
  });

  return (
    <DropDown
      value={value}
      isActive={isActive}
      dropDownRef={dropDownRef}
      buttonOnClickHandler={buttonOnClickHandler}
    >
      <ul>
        {allItemConstant.map((item) => (
          <li key={item.id}>
            <DropdownListItem
              item={item}
              isActiveMenu={isActive}
              togglePlatforms={togglePlatforms}
              platformsId={selectedItems}
            />
          </li>
        ))}
      </ul>
    </DropDown>
  );
};

export default DropdownList;
