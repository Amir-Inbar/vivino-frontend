import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { wineService } from "../services/wine.service";
import { setFilterBy } from "../store/actions/wineAction";

export const WineRegionFilter = ({ filter }) => {
  const dispatch = useDispatch();
  const [isChanged, setIsChanged] = useState(false);
  const [select, setSelect] = useState(
    filter?.inRegion ? filter?.inRegion.split("|") : []
  );
  const [region, setRegion] = useState([]);

  useEffect(async () => {
    if (!region.length)
      try {
        const res = await wineService.query({ listOf: "region" });
        if (res) setRegion(res.map((data) => data.region));
      } catch {}
  }, [region]);

  useEffect(() => {
    if (!isChanged) return;
    setIsChanged(false);
    dispatch(setFilterBy({ ...filter, inRegion: select.join("|") }));
  }, [select]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
    setIsChanged(true);
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
