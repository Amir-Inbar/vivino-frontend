import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { debounce, extractConditionKey } from "../services/util.service";

export const MultiSelectFilter = ({ title, query, data, max = 8 }) => {
  const location = useLocation();
  const history = useHistory();
  const { filter } = useSelector((state) => state.wineModule);
  const queries = new URLSearchParams(location.search);

  const setQuery = (name, value) => {
    if (value) queries.set(name, value);
    else queries.delete(name);
    history.replace({ search: queries.toString() });
  };

  const [select, setSelect] = useState([]);

  useEffect(
    () =>
      debounce(
        () => setQuery(extractConditionKey(query)?.key, select.join("|")),
        query,
        500
      ),
    [select]
  );

  useEffect(
    () =>
      debounce(() => setSelect(filter[query]?.split("|") || []), query, 500),
    [filter[query]]
  );

  const toggleSelect = (type) => {
    if (!type) return;
    type = type.toLowerCase();
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
  };

  return data ? (
    <section className="wine-select-buttons">
      <h2>{title}</h2>
      {data
        .map((item, idx) => {
          const { name, seo } = item;
          return (
            <button
              key={`BUTTON_${query}${idx}`}
              className={`${
                select.includes(seo || name?.toLowerCase()) ? "selected" : ""
              }`}
              onClick={() => toggleSelect(seo || name)}
            >
              {name}
            </button>
          );
        })
        .slice(0, max)}
    </section>
  ) : null;
};
