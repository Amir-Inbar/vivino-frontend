import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { wineService } from "../services/wine.service";

export const WineRegionFilter = ({ filter }) => {
  const [select, setSelect] = useState(
    filter?.inRegion ? filter?.inRegion.split("|") : []
  );
  const [region, setRegion] = useState([]);

  const location = useLocation();
  const history = useHistory();

  const setQuery = (name, value) => {
    const queryParams = new URLSearchParams(location.search);
    if (value) queryParams.set(name, value);
    else queryParams.delete(name);
    history.replace({ search: queryParams.toString() });
  };

  useEffect(async () => {
    if (!region.length)
      try {
        const res = await wineService.query({ listOf: "region" });
        if (res) setRegion(res.map((data) => data.region));
      } catch {}
  }, [region]);

  useEffect(() => {
    setQuery("region", select.join("|"));
  }, [select]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
  };

  const TypeButton = () =>
    region
      .map((type, idx) => (
        <button
          key={"REGION_BUTTON_" + idx}
          className={`${select.includes(type) ? "selected" : ""}`}
          onClick={() => toggleSelect(type)}
        >
          {type}
        </button>
      ))
      .slice(0, 9);

  return (
    <section className="wine-select-buttons">
      <h2>Regions</h2>
      <TypeButton />
    </section>
  );
};
