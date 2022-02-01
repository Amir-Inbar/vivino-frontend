import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export const MultiSelectFilter = ({ title, query, data }) => {
  const location = useLocation();
  const history = useHistory();

  const getQuery = (name) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(name)?.split("-") || [];
  };

  const setQuery = (name, value) => {
    const queryParams = new URLSearchParams(location.search);
    if (value) queryParams.set(name, value);
    else queryParams.delete(name);
    history.replace({ search: queryParams.toString() });
  };

  const [select, setSelect] = useState(getQuery(query) || []);

  useEffect(() => {
    setQuery(query, select.join("-"));
  }, [select]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
  };

  const TypeButton = () =>
    data.map((type, idx) => (
      <button
        key={`BUTTON_${query}${idx}`}
        className={`${select.includes(type) ? "selected" : ""}`}
        onClick={() => toggleSelect(type)}
      >
        {type}
      </button>
    ));

  return (
    <section className="wine-select-buttons">
      <h2>{title}</h2>
      <TypeButton />
    </section>
  );
};
