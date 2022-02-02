import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export const MultiSelectFilter = ({ title, query, data, max = 8 }) => {
  const location = useLocation();
  const history = useHistory();
  const queries = new URLSearchParams(location.search);

  const getQuery = (useCallback = () => (name) => queries.get(name) || []);

  const setQuery = (name, value) => {
    if (value) queries.set(name, value);
    else queries.delete(name);
    history.replace({ search: queries.toString() });
  };

  const [select, setSelect] = useState(getQuery(query) || []);

  useEffect(() => {
    setQuery(query, select.join("|"));
  }, [select]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
  };

  return data ? (
    <section className="wine-select-buttons">
      <h2>{title}</h2>
      {data
        .map((type, idx) => (
          <button
            key={`BUTTON_${query}${idx}`}
            className={`${select.includes(type) ? "selected" : ""}`}
            onClick={() => toggleSelect(type)}
          >
            {type.replaceAll("-", " ")}
          </button>
        ))
        .slice(0, max)}
    </section>
  ) : null;
};
