import React from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { setCurrentPage } from "../../redux/filter/slice";
import { TListId } from "../../redux/filter/types";
import { TFilterContext } from "../../contexts/FilterContext/FilterContext";

import { DropdownListItem } from "..";
import { DropDown } from "../UI";
import { isEqual } from "../../utils/arraysComparing";
import { setLocalStorage } from "../../utils/localStorage";
import { useClickOutside } from "../../hooks/useClickOutside";
import { DropdownListProps } from "../types";
import { TABLET } from "../../constants";

const DropdownList: React.FC<DropdownListProps> = ({
  startItems,
  selectedItems,
  setItemsIdtoState,
  setItemsIdToContext,
  value,
  allItemConstant,
}) => {
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ maxWidth: TABLET });
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const startItemsRef = React.useRef<TListId | null>(null);
  startItemsRef.current = [...startItems];
  const selectedItemsRef = React.useRef<TListId | null>(null);
  selectedItemsRef.current = [...selectedItems];

  const sortAndCompareArrays = () => {
    const sortedSelectedItemsRef = [...selectedItemsRef.current!].sort(
      (a, b) => a - b
    );

    if (!isEqual(startItemsRef.current!, sortedSelectedItemsRef)) {
      !isTablet && dispatch(setItemsIdtoState(selectedItemsRef.current));
      dispatch(setCurrentPage(1));
      setLocalStorage(value, selectedItemsRef.current!);
    }
  };

  const toggleItems = React.useCallback((id: number) => {
    if (selectedItemsRef.current!.includes(id)) {
      setItemsIdToContext((prevState: TFilterContext) => {
        return {
          ...prevState,
          [`${value}Context`]: selectedItemsRef.current!.filter(
            (item) => item !== id
          ),
        };
      });
    } else if (!selectedItemsRef.current!.includes(id)) {
      setItemsIdToContext((prevState: TFilterContext) => {
        return {
          ...prevState,
          [`${value}Context`]: [...selectedItemsRef.current!, id],
        };
      });
    }
  }, []);

  const onButtonClickHandler = () => {
    if (isActive) {
      sortAndCompareArrays();
      setIsActive(false);
    } else {
      setIsActive(true);
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
      onButtonClickHandler={onButtonClickHandler}
    >
      {allItemConstant.map((item) => (
        <DropdownListItem
          key={item.id}
          item={item}
          isAciveAtStart={selectedItems.includes(item.id)}
          toggleItems={toggleItems}
        />
      ))}
    </DropDown>
  );
};
export default DropdownList;
