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
  const { search, dates, platformsId, genresId, tagsId } =
    useSelector(getFilter);

  const initValue = {
    searchContext: search,
    datesContext: dates.length ? dates.map((item) => new Date(item)) : null,
    platformsContext: [...platformsId],
    genresContext: [...genresId],
    tagsContext: [...tagsId],
  };

  const [value, setContextValue] = React.useState(initValue);

  return (
    <FilterContext.Provider
      value={{
        searchContext: { value: value.searchContext },
        datesContext: { value: value.datesContext },
        platformsContext: { value: value.platformsContext },
        genresContext: { value: value.genresContext },
        tagsContext: { value: value.tagsContext },
        setContextValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
