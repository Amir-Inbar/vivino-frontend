import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { wineService } from "../services/wine.service";

export const WineStyleFilter = ({ filter }) => {
  const [select, setSelect] = useState(
    filter?.inSeo ? filter?.inSeo.split("|") : []
  );
  const [style, setStyle] = useState([]);

  const location = useLocation();
  const history = useHistory();

  const setQuery = (name, value) => {
    const queryParams = new URLSearchParams(location.search);
    if (value) queryParams.set(name, value);
    else queryParams.delete(name);
    history.replace({ search: queryParams.toString() });
  };

  useEffect(async () => {
    if (!style.length)
      try {
        const res = await wineService.query({ listOf: "seo" });
        if (res) setStyle(res.map((data) => data.seo));
      } catch {}
  }, [style]);

  useEffect(() => {
    setQuery("style", select.join("|"));
  }, [select]);

  const toggleSelect = (type) => {
    if (select.includes(type)) setSelect(select.filter((val) => val !== type));
    else setSelect([...select, type]);
  };

  const TypeButton = () =>
    style
      .map((type, idx) => (
        <button
          key={"STYLE_BUTTON_" + idx}
          className={`${select.includes(type) ? "selected" : ""}`}
          onClick={() => toggleSelect(type)}
        >
          {type.replaceAll("-", " ")}
        </button>
      ))
      .slice(0, 9);

  return (
    <section className="wine-select-buttons">
      <h2>Wine styles</h2>
      <TypeButton />
    </section>
  );
};
