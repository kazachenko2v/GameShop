import React from "react";
import { useDispatch } from "react-redux";
import { TListId } from "../../redux/filter/types";

import { DropDown, DropdownListItem } from "..";
import { arraysComparing } from "../../utils/dropdown";
import { setLocalStorage } from "../../utils/localStorage";
import { useClickOutside } from "../../hooks/useClickOutside";
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
      !isTablet && dispatch(setItemsIdtoState(toUpdate));
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
      <>
        {allItemConstant.map((item) => (
          <DropdownListItem
            key={item.id}
            item={item}
            isActiveMenu={isActive}
            toggleItems={toggleItems}
            itemsId={selectedItems}
          />
        ))}
      </>
    </DropDown>
  );
};

export default DropdownList;
