import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterBy } from "../store/actions/wineAction";
import grapes from "../assets/json/grapes.json";

export const WineGrapesFilter = ({ filter }) => {
  const dispatch = useDispatch();
  const [isChanged, setIsChanged] = useState(false);
  const [select, setSelect] = useState(
    filter?.["in+Grapes"] ? filter?.["in+Grapes"].split("|") : []
  );

  useEffect(() => {
    if (!isChanged) return;
    setIsChanged(false);
    dispatch(setFilterBy({ ...filter, "in+Grapes": select.join("|") }));
  }, [select]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
    setIsChanged(true);
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
