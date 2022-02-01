import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { wineService } from "../services/wine.service";

export const WineCountryFilter = ({ filter }) => {
  const [select, setSelect] = useState(
    filter?.inCountry ? filter?.inCountry.split("|") : []
  );
  const [country, setCountry] = useState([]);

  const location = useLocation();
  const history = useHistory();

  const setQuery = (name, value) => {
    const queryParams = new URLSearchParams(location.search);
    if (value) queryParams.set(name, value);
    else queryParams.delete(name);
    history.replace({ search: queryParams.toString() });
  };

  useEffect(async () => {
    if (!country.length)
      try {
        const res = await wineService.query({ listOf: "country" });
        if (res) setCountry(res.map((data) => data.country));
      } catch {}
  }, [country]);

  useEffect(() => {
    setQuery("country", select.join("-"));
  }, [select]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
  };

  const TypeButton = () =>
    country
      .map((type, idx) => (
        <button
          key={"COUNTRY_BUTTON_" + idx}
          className={`${select.includes(type) ? "selected" : ""}`}
          onClick={() => toggleSelect(type)}
        >
          {type}
        </button>
      ))
      .slice(0, 9);

  return (
    <section className="wine-select-buttons">
      <h2>Countries</h2>
      <TypeButton />
    </section>
  );
};
