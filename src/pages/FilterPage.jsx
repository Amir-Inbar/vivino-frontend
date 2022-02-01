import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelectFilter } from "../components/MultiSelectFilter";
import { WinePreviews } from "../components/WinePreview";
import { debounce } from "../services/util.service";
import { wineService } from "../services/wine.service";
import { saveWines, setFilterBy } from "../store/actions/wineAction";

import grapes from "../assets/json/grapes.json";
import { ScaleRangeFilter } from "../components/ScaleRangeFilter";

export const FilterPage = (props) => {
  const dispatch = useDispatch();
  const [wines, setWines] = useState(null);
  const [regions, setRegions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [styles, setStyles] = useState([]);
  const { filter } = useSelector((state) => state.wineModule);
  const tableEl = useRef(null);

  useEffect(async () => {
    setCountries(await getListOf("country"));
    setRegions(await getListOf("region"));
    setStyles(await getListOf("seo"));
  }, [tableEl]);

  const getListOf = async (key) => {
    try {
      const res = await wineService.query({ listOf: key });
      return res.map((data) => data[key]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(props.location.search);
    dispatch(
      setFilterBy({
        eqType: queryParams.get("type")?.split("-").join("|"),
        inRegion: queryParams.get("region")?.split("-").join("|"),
        "in+Grapes": queryParams.get("grapes")?.split("-").join("|"),
        inCountry: queryParams.get("country")?.split("-").join("|"),
        inSeo: queryParams.get("style"),
      })
    );
  }, [props.location.search]);

  useEffect(async () => {
    try {
      debounce(
        async () => {
          const wines = await wineService.query({ filter });
          setWines(wines);
          dispatch(saveWines(wines));
          tableEl.current.scrollTo(0, 0);
        },
        "GET_WINES",
        1000
      );
    } catch {}
  }, [filter]);

  useEffect(() => {
    if (wines) dispatch(saveWines(wines));
  }, [wines]);

  const scrollDown = async (ev) => {
    if (wines.page.index < wines.page.total - 1) {
      const { scrollTop, scrollHeight, clientHeight } = ev.target;
      const leftToEnd = scrollHeight - clientHeight - scrollTop;
      if (
        leftToEnd &
        (leftToEnd * (wines.page.index + 1) <
          (clientHeight / (wines.page.index + 1)) * 0.8)
      ) {
        const res = await wineService.query({
          filter,
          page: { index: wines.page.index + 1 },
        });
        if (res) setWines({ ...res, data: [...wines.data, ...res.data] });
      }
    }
  };

  return wines ? (
    <section className="wines-filter">
      <nav className="filter-menu">
        <MultiSelectFilter
          title="Wine type"
          query="type"
          data={["red", "white", "rose", "sparkling", "dessert", "fortifield"]}
        />
        <ScaleRangeFilter title="Average rate" fromQuery="from" toQuery="to" />
        <MultiSelectFilter title="Grapes" query="grapes" data={grapes} />
        <MultiSelectFilter title="Regions" query="region" data={regions} />
        <MultiSelectFilter title="Countries" query="country" data={countries} />
        <MultiSelectFilter title="Wine styles" query="style" data={styles} />
      </nav>
      <div className="wines-result" onScroll={scrollDown} ref={tableEl}>
        <WinePreviews wines={wines.data} />
      </div>
    </section>
  ) : null;
};
