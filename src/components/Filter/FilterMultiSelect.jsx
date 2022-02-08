import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useChangeEffect from "../../hooks/useChangeEffect";
import { extractConditionKey } from "../../services/util.service";

export const MultiSelectFilter = ({ title, query, data, max = 6 }) => {
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
    const val = select.reduce((result, val) => {
      if (
        !result.find((item) => (item.seo || item.name?.toLowerCase()) === val)
      ) {
        const extract = data.find(
          (item) => (item.seo || item.name?.toLowerCase()) === val
        );
        if (extract) result.push(extract);
      }
      return result;
    }, data.slice(0, max));
    setDataToShow(val);
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
        const key = seo || name?.toLowerCase().replace(" ", "-");
        return (
          <button
            key={`BUTTON_${key}${idx}`}
            className={`${
              select.includes(seo || name.toLowerCase()) ? "selected" : ""
            }`}
            onClick={() => toggleSelect(seo || name)}
            data-trans={key}
          >
            {name}
          </button>
        );
      })}
    </section>
  ) : null;
};
