import React from "react";
import { MultiSelectFilter } from "../Filter/FilterMultiSelect";

export const WineFilters = ({ keywords }) => {
  const { data, query } = keywords;
  return Object.keys(keywords.data).map((filter, idx) => (
    <MultiSelectFilter
      key={`WINE_FILTER_${idx}`}
      title={filter}
      query={query[filter]}
      data={data[filter]}
    />
  ));
};
