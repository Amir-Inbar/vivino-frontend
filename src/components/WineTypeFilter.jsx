import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export const WineTypesFilter = (props) => {
  const { filter } = props;
  const [select, setSelect] = useState(
    filter?.eqType ? filter?.eqType.split("|") : []
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
    setQuery("type", select.join("-"));
  }, [select]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
  };

  const TypeButton = () =>
    ["red", "white", "rose", "sparkling", "dessert", "fortifield"].map(
      (type, idx) => (
        <button
          key={"TYPE_BUTTON_" + idx}
          className={`${select.includes(type) ? "selected" : ""}`}
          onClick={() => toggleSelect(type)}
        >
          {type}
        </button>
      )
    );

  return (
    <section className="wine-select-buttons">
      <h2>Wine types</h2>
      <TypeButton />
    </section>
  );
};
