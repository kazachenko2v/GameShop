import React from "react";
import { useSelector } from "react-redux";
import { getFilter } from "../../redux/filter/selectors";
import { useGetTagsQuery } from "../../redux/filtes.api";
import { FilterContext } from "./FilterContext";

interface IFilterContextProvider {
  children: React.ReactNode;
}

const FilterContextProvider: React.FC<IFilterContextProvider> = ({
  children,
}) => {
  const { dates, platformsId, genresId, tagsId } = useSelector(getFilter);
  // const { data: tagsId, isSuccess } = useGetTagsQuery();

  const initValue = {
    calendar: dates.length ? dates.map((item) => new Date(item)) : null,
    platforms: [...platformsId],
    selectedGenres: [...genresId],
    selectedTags: [...tagsId],
  };

  const [value, setValue] = React.useState(initValue);

  return (
    <FilterContext.Provider
      value={{
        calendar: { value: value.calendar },
        platforms: { value: value.platforms },
        selectedGenres: { value: value.selectedGenres },
        selectedTags: { value: value.selectedTags },
        setValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
