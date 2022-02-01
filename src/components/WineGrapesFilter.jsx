import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import grapes from "../assets/json/grapes.json";

export const WineGrapesFilter = ({ filter }) => {
  const [select, setSelect] = useState(
    filter?.["in+Grapes"] ? filter?.["in+Grapes"].split("|") : []
  );

  const location = useLocation();
  const history = useHistory();

  const setQuery = (name, value) => {
    const queryParams = new URLSearchParams(location.search);
    if (value) queryParams.set(name, value);
    else queryParams.delete(name);
    history.replace({ search: queryParams.toString() });
  };

  useEffect(() => {
    setQuery("grapes", select.join("-"));
  }, [select]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
  };

  const TypeButton = () =>
    grapes.map((type, idx) => (
      <button
        key={"GRAPES_BUTTON_" + idx}
        className={`${select.includes(type) ? "selected" : ""}`}
        onClick={() => toggleSelect(type)}
      >
        {type}
      </button>
    ));

  return (
    <section className="wine-select-buttons">
      <h2>Wine types</h2>
      <TypeButton />
    </section>
  );
};
