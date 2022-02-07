import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useChangeEffect from "../../hooks/useChangeEffect";
import { extractConditionKey } from "../../services/util.service";

export const MultiSelectFilter = ({ title, query, data, max = 8 }) => {
  const location = useLocation();
  const history = useHistory();
  const filter = useSelector((state) => state.wineModule.filter);
  const queries = new URLSearchParams(location.search);
  const [dataToShow, setDataToShow] = useState([]);

  const [select, setSelect] = useState([]);

  useChangeEffect(() => {
    const setQuery = (name, value) => {
      if (value) queries.set(name, value);
      else queries.delete(name);
      history.replace({ search: queries.toString() });
    };
    setQuery(extractConditionKey(query)?.key, select.join("|"));
  }, [select]);

  useEffect(() => {
    const selected = filter[query]?.split("|") || [];
    setSelect(selected);
    const exists = data.filter(
      (val) =>
        selected.includes(val.seo) || selected.includes(val.name?.toLowerCase())
    );
    const add =
      exists.length < max
        ? data
            .filter(
              (val) =>
                !selected.includes(val.seo) &&
                !selected.includes(val.name?.toLowerCase())
            )
            .slice(0, max - exists.length)
        : [];
    setDataToShow([...exists, ...add].sort((a, b) => b.count - a.count));
  }, [filter[query]]);

  const toggleSelect = (type) => {
    type = type.toLowerCase();
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
  };

  return data ? (
    <section className="wine-select-buttons">
      <h2 data-trans={title.toLowerCase().replace(" ", "-")}>{title}</h2>
      {dataToShow.map((item, idx) => {
        const { name, seo } = item;
        return (
          <button
            key={`BUTTON_${query}${idx}`}
            className={`${
              select.includes(seo || name.toLowerCase()) ? "selected" : ""
            }`}
            onClick={() => toggleSelect(seo || name)}
            data-trans={seo || name.toLowerCase().replace(" ", "-")}
          >
            {name}
          </button>
        );
      })}
    </section>
  ) : null;
};
