import React from "react";
import qs from "qs";
import { useDispatch } from "react-redux";
import { setFilters } from "../redux/filter/slice";
import { IFilterSliceState } from "../redux/filter/types";

type funcArgs = {
  page: number;
  platformsId: number[];
  genresId: number[];
  tagsId: number[];
  search: string;
  dates: string[];
};

export const useSearchParams = (arr: funcArgs): string => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = React.useState<string>("");
  const { page, platformsId, genresId, tagsId, search, dates } = { ...arr };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as Record<string, string>;

      const trueTypeParams: IFilterSliceState = {
        page: Number(params.page),
        platformsId: params.parent_platforms
          ? params.parent_platforms
              .split(",")
              .map((item: string) => Number(item))
          : [],
        genresId: params.genres
          ? params.genres.split(",").map((item: string) => Number(item))
          : [],
        tagsId: params.tags
          ? params.tags.split(",").map((item: string) => Number(item))
          : [],
        search: params.search ? params.search : "",
        dates: params.dates ? params.dates.split(",") : [],
      };
      dispatch(setFilters(trueTypeParams));
    }
  }, []);

  React.useEffect(() => {
    const pageValue = `&page=${page}`;
    const searchValue = search ? `&search=${search}` : "";
    const datesValue = dates.length ? `&dates=${dates.join(",")}` : "";
    const platformsValue = platformsId.length
      ? `&parent_platforms=${platformsId.join(",")}`
      : "";
    const genresValue = genresId.length ? `&genres=${genresId.join(",")}` : "";
    const tagsValue = tagsId.length ? `&tags=${tagsId.join(",")}` : "";

    setSearchParams(
      pageValue +
        searchValue +
        datesValue +
        platformsValue +
        genresValue +
        tagsValue
    );
  }, [page, platformsId, genresId, tagsId, search, dates]);

  return searchParams;
};
