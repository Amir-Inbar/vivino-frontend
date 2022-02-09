import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useChangeEffect from "../../hooks/useChangeEffect";
import {
  extractConditionKey,
  sentenceToKababCase,
} from "../../services/util.service";

export const MultiSelectFilter = ({ title, query, data, max = 6 }) => {
  const location = useLocation();
  const history = useHistory();
  const filter = useSelector((state) => state.wineModule.filter);
  const queries = new URLSearchParams(location.search);
  const elInput = useRef(null);
  const [dataToShow, setDataToShow] = useState([]);
  const [select, setSelect] = useState([]);

  useChangeEffect(() => {
    const setQuery = (name, value) => {
      if (value) queries.set(name, value);
      else queries.delete(name);
      history.replace({ search: queries.toString() });
    };
    setQuery(extractConditionKey(query)?.key, select.join("|"));
    if (!select.length) setDataToShow(data.slice(0, 6));
  }, [select]);

  useEffect(() => {
    const selected = filter[query]?.split("|") || [];
    setSelect(selected);
    const val = select.reduce((result, val) => {
      const extract = data.find(
        (item) => (item.seo || item.name?.toLowerCase()) === val
      );
      if (extract) result.push(extract);
      return result;
    }, []);
    setDataToShow([
      ...new Set([...val, ...data.slice(0, Math.max(0, 6 - val.length))]),
    ]);
  }, [filter[query]]);

  const toggleSelect = (type) => {
    if (!type) return;
    type = type.toLowerCase();
    if (select.includes(type)) {
      setSelect(select.filter((val) => val !== type));
    } else {
      setSelect([...select, type]);
    }
  };

  const onSearch = ({ target }) => {
    if (!target.value) {
      const show = data.filter(({ name, seo }) =>
        select.includes(seo?.replace("-", " ") || name?.toLowerCase())
      );
      setDataToShow(show.length ? show : data.slice(0, 6));
    } else {
      const re = new RegExp(`^(${target.value})`, "gi");
      console.log(select);
      const result = data
        .filter(
          ({ name, seo }) =>
            !select.includes(seo) && !select.includes(name?.toLowerCase())
        )
        .filter(
          ({ name, seo }) => name?.match(re) || seo?.replace("-", " ").match(re)
        )
        .slice(0, 8);
      setDataToShow(result);
    }
  };

  const handleKey = ({ key, target }) => {
    if (key === "Enter") {
      const find = target.value.toLowerCase();
      const res =
        data.find(
          ({ name, seo }) =>
            name?.toLowerCase() === find ||
            seo?.replace("-", " ").toLowerCase() === find
        ) || dataToShow[0];
      if (res) {
        toggleSelect(res?.seo || res?.name);
        elInput.current.value = "";
      }
    }
  };

  return data ? (
    <>
      <section className="wine-select-buttons">
        <h2 data-trans={sentenceToKababCase(title)}>{title}</h2>
        <div className="quick-filter-search">
          <input
            ref={elInput}
            onKeyPress={handleKey}
            onInput={onSearch}
            spellCheck="false"
          ></input>
        </div>
        {dataToShow.map((item, idx) => {
          const { name, seo } = item;
          const key = seo || sentenceToKababCase(name);
          return (
            <button
              key={`BUTTON_${key}${idx}`}
              className={`${
                select.includes(seo || name.toLowerCase())
                  ? "selected bgi"
                  : "bgi"
              }`}
              onClick={() => toggleSelect(seo || name)}
              data-trans={key}
            >
              {name}
            </button>
          );
        })}
      </section>
    </>
  ) : null;
};
