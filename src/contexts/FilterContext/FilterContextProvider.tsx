import React from "react";
import { useSelector } from "react-redux";
import { getFilter } from "../../redux/filter/selectors";
import { FilterContext } from "./FilterContext";

interface IFilterContextProvider {
  children: React.ReactNode;
}

const FilterContextProvider: React.FC<IFilterContextProvider> = ({
  children,
}) => {
  const { dates, platformsId, genresId } = useSelector(getFilter);

  const initValue = {
    calendar: dates.length ? dates.map((item) => new Date(item)) : null,
    platforms: [...platformsId],
    selectedGenres: [...genresId],
  };

  const [value, setValue] = React.useState(initValue);

  return (
    <FilterContext.Provider
      value={{
        calendar: { value: value.calendar },
        platforms: { value: value.platforms },
        selectedGenres: { value: value.selectedGenres },
        setValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
