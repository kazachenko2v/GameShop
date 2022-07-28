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
  const { dates, platformsId, genresId, tagsId } = useSelector(getFilter);

  const initValue = {
    calendar: dates.length ? dates.map((item) => new Date(item)) : null,
    Platforms: [...platformsId],
    Genres: [...genresId],
    Tags: [...tagsId],
  };

  const [value, setValue] = React.useState(initValue);

  return (
    <FilterContext.Provider
      value={{
        calendar: { value: value.calendar },
        Platforms: { value: value.Platforms },
        Genres: { value: value.Genres },
        Tags: { value: value.Tags },
        setValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
