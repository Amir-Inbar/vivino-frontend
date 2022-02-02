import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { extractConditionKey } from "../services/util.service";

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

  useEffect(() => {
    setQuery(extractConditionKey(query)?.key, select.join("|"));
  }, [select]);

  useEffect(() => setSelect(filter[query]?.split("|") || []), [filter[query]]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
  };

  return data ? (
    <section className="wine-select-buttons">
      <h2>{title}</h2>
      {data
        .map((type, idx) => {
          type = type.toLowerCase();
          return (
            <button
              key={`BUTTON_${query}${idx}`}
              className={`${select.includes(type) ? "selected" : ""}`}
              onClick={() => toggleSelect(type)}
            >
              {type.replaceAll("-", " ")}
            </button>
          );
        })
        .slice(0, max)}
    </section>
  ) : null;
};
