import React from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { setCurrentPage } from "../../redux/filter/slice";
import { TListId } from "../../redux/filter/types";
import {
  FilterContext,
  IFilterContextInterface,
  TFilterContext,
} from "../../contexts/FilterContext/FilterContext";

import { DropDown, DropdownListItem } from "..";
import { arraysComparing } from "../../utils/dropdown";
import { setLocalStorage } from "../../utils/localStorage";
import { useClickOutside } from "../../hooks/useClickOutside";
import { DropdownListProps } from "../types";
import { TABLET } from "../../constants";

const DropdownList: React.FC<DropdownListProps> = ({
  startItems,
  selectedItems,
  setItemsIdtoState,
  value,
  allItemConstant,
}) => {
  const dispatch = useDispatch();

  const isTablet = useMediaQuery({ maxWidth: TABLET });

  const { setContextValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;

  const [isActive, setIsActive] = React.useState<boolean>(false);
  const selectedItemsRef = React.useRef<TListId | null>(null);
  selectedItemsRef.current = [...selectedItems];

  const sortAndCompareArrays = () => {
    const sortedSelectedItemsRef = selectedItemsRef.current!.sort(
      (a, b) => a - b
    );

    const toUpdate = arraysComparing(startItems, sortedSelectedItemsRef);
    if (toUpdate) {
      if (!isTablet) {
        dispatch(setItemsIdtoState(toUpdate));
        dispatch(setCurrentPage(1));
      }
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

  const toggleItems = (id: number) => {
    if (selectedItems.includes(id)) {
      setContextValue((prevState: TFilterContext) => {
        return {
          ...prevState,
          [`${value}Context`]: [...selectedItems].filter((item) => item !== id),
        };
      });
    } else if (!selectedItems.includes(id)) {
      setContextValue((prevState: TFilterContext) => {
        return { ...prevState, [`${value}Context`]: [...selectedItems, id] };
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
      {allItemConstant.map((item) => (
        <DropdownListItem
          key={item.id}
          item={item}
          isActiveMenu={isActive}
          toggleItems={toggleItems}
          itemsId={selectedItems}
        />
      ))}
    </DropDown>
  );
};

export default DropdownList;
