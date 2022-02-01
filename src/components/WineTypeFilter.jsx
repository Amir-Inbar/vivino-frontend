import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterBy } from "../store/actions/wineAction";

export const WineTypesFilter = ({ filter }) => {
  const dispatch = useDispatch();
  const [isChanged, setIsChanged] = useState(false);
  const [select, setSelect] = useState(
    filter?.eqType ? filter?.eqType.split("|") : []
  );

  useEffect(() => {
    if (!isChanged) return;
    setIsChanged(false);
    dispatch(setFilterBy({ ...filter, eqType: select.join("|") }));
  }, [select]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
    setIsChanged(true);
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
