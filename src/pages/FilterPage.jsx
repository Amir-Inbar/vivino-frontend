import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelectFilter } from "../components/MultiSelectFilter";
import { WinePreviews } from "../components/WinePreview";
import { debounce } from "../services/util.service";
import { wineService } from "../services/wine.service";
import {
  saveWines,
  setFilterBy,
  setKeywords,
} from "../store/actions/wineAction";

import grapes from "../assets/json/grapes.json";
import { ScaleRangeFilter } from "../components/ScaleRangeFilter";

export const FilterPage = (props) => {
  const dispatch = useDispatch();
  const [wines, setWines] = useState(null);
  const { filter, keywords } = useSelector((state) => state.wineModule);
  const tableEl = useRef(null);

  useEffect(async () => {
    if (!keywords)
      try {
        const res = await wineService.query({ keywords: true });
        dispatch(setKeywords(res));
      } catch (err) {
        console.log(err);
      }
  }, [tableEl]);

  useEffect(() => {
    debounce(
      () => {
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
      },
      "SET_FILTER",
      filter ? 500 : 0
    );
  }, [props.location.search]);

  useEffect(async () => {
    try {
      const wines = await wineService.query({ filter });
      setWines(wines);
      dispatch(saveWines(wines));
      tableEl.current.scrollTo(0, 0);
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
          data={keywords.types}
        />
        <ScaleRangeFilter title="Average rate" fromQuery="from" toQuery="to" />
        <MultiSelectFilter title="Grapes" query="grapes" data={grapes} />
        <MultiSelectFilter
          title="Regions"
          query="region"
          data={keywords.regions}
        />
        <MultiSelectFilter
          title="Countries"
          query="country"
          data={keywords.countries}
        />
        <MultiSelectFilter
          title="Wine styles"
          query="style"
          data={keywords.styles}
        />
      </nav>
      <div className="wines-result" onScroll={scrollDown} ref={tableEl}>
        <WinePreviews wines={wines.data} />
      </div>
    </section>
  ) : null;
};
