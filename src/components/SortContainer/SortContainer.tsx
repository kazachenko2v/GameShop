import React from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { setFilters } from "../../redux/filter/slice";
import { IFilterSliceState } from "../../redux/filter/types";
import {
  setPlatformsId,
  setGenresId,
  setTagsId,
} from "../../redux/filter/slice";

import {
  FilterContext,
  IFilterContextInterface,
} from "../../contexts/FilterContext/FilterContext";
import { dateToString } from "../../utils/stringToDate";
import { useActiveFiltersCount } from "../../hooks";
import { DropdownList, Dates, MobileDropDownMenu } from "../";
import Filter from "../../assets/images/filter.svg";

import { ALL_PLATFORMS, ALL_GENRES, ALL_TAGS } from "../../constants";

import styles from "./SortContainer.module.css";
import cn from "classnames";

const SortContainer: React.FC<IFilterSliceState> = ({
  page,
  search,
  platformsId,
  genresId,
  tagsId,
  dates,
}) => {
  const { calendar, Genres, Tags, Platforms, setValue } = React.useContext(
    FilterContext
  ) as IFilterContextInterface;
  const dispatch = useDispatch();
  const isTablet = useMediaQuery({ maxWidth: 912 });

  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);

  const acceptHandler = () => {
    setIsOpenMenu(false);
    dispatch(
      setFilters({
        page: page,
        platformsId: Platforms.value,
        genresId: Genres.value,
        tagsId: Tags.value,
        search: search,
        dates: calendar.value ? dateToString(calendar.value) : [],
      })
    );
  };

  const clearAll = () => {
    setIsOpenMenu(false);
    setValue((prevState) => {
      return { ...prevState, calendar: null };
    });
    setValue((prevState) => {
      return { ...prevState, Platforms: [] };
    });
    setValue((prevState) => {
      return { ...prevState, Genres: [] };
    });
    setValue((prevState) => {
      return { ...prevState, Tags: [] };
    });
    dispatch(
      setFilters({
        page: page,
        platformsId: [],
        genresId: [],
        tagsId: [],
        search: "",
        dates: [],
      })
    );
  };

  const activeFiltersCount = useActiveFiltersCount([
    search,
    platformsId,
    genresId,
    tagsId,
    dates,
  ]);
  return isTablet ? (
    <div className={styles.container}>
      <button
        className={styles.button_main}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <img className={styles.icon} src={Filter} alt="Filter" />
        <span>
          Filters{" "}
          {activeFiltersCount.length > 0 ? activeFiltersCount.length : ""}
        </span>
      </button>
      <MobileDropDownMenu isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu}>
        <div className={styles.menu}>
          <ul className={styles.list_mobile}>
            <li className={styles.item}>
              <DropdownList
                isTablet={isTablet}
                startItems={platformsId}
                selectedItems={Platforms.value}
                setValue={setValue}
                setItemsIdtoState={setPlatformsId}
                value={"Platforms"}
                allItemConstant={ALL_PLATFORMS}
              />
            </li>
            <li className={styles.item}>
              <DropdownList
                isTablet={isTablet}
                startItems={genresId}
                selectedItems={Genres.value}
                setValue={setValue}
                setItemsIdtoState={setGenresId}
                value={"Genres"}
                allItemConstant={ALL_GENRES}
              />
            </li>
            <li className={styles.item}>
              <DropdownList
                isTablet={isTablet}
                startItems={tagsId}
                selectedItems={Tags.value}
                setValue={setValue}
                setItemsIdtoState={setTagsId}
                value={"Tags"}
                allItemConstant={ALL_TAGS}
              />
            </li>
            <li className={styles.item}>
              <Dates isTablet={isTablet} />
            </li>
          </ul>
          <div className={styles.buttons__container}>
            <button className={styles.button} onClick={clearAll}>
              Clear
            </button>
            <button
              className={cn(styles.button, styles.button_accept)}
              onClick={acceptHandler}
            >
              Accept
            </button>
          </div>
        </div>
      </MobileDropDownMenu>
    </div>
  ) : (
    <ul className={styles.container}>
      <li className={styles.item}>
        <DropdownList
          isTablet={isTablet}
          startItems={platformsId}
          selectedItems={Platforms.value}
          setValue={setValue}
          setItemsIdtoState={setPlatformsId}
          value={"Platforms"}
          allItemConstant={ALL_PLATFORMS}
        />
      </li>
      <li className={styles.item}>
        <DropdownList
          isTablet={isTablet}
          startItems={genresId}
          selectedItems={Genres.value}
          setValue={setValue}
          setItemsIdtoState={setGenresId}
          value={"Genres"}
          allItemConstant={ALL_GENRES}
        />
      </li>
      <li className={styles.item}>
        <DropdownList
          isTablet={isTablet}
          startItems={tagsId}
          selectedItems={Tags.value}
          setValue={setValue}
          setItemsIdtoState={setTagsId}
          value={"Tags"}
          allItemConstant={ALL_TAGS}
        />
      </li>
      <li className={styles.item}>
        <Dates isTablet={isTablet} />
      </li>
    </ul>
  );
};

export default SortContainer;
