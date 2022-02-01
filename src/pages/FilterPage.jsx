import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WineAvgRateFilter } from "../components/WineAvgRateFilter";
import { WineCountryFilter } from "../components/WineCountryFilter";
import { WineGrapesFilter } from "../components/WineGrapesFilter";
import { WinePreviews } from "../components/WinePreview";
import { WineRegionFilter } from "../components/WineRegionFilter";
import { WineStyleFilter } from "../components/WineStyleFilter";
import { WineTypesFilter } from "../components/WineTypeFilter";
import { debounce } from "../services/util.service";
import { wineService } from "../services/wine.service";
import { saveWines, setFilterBy } from "../store/actions/wineAction";

export const FilterPage = (props) => {
  const dispatch = useDispatch();
  const [wines, setWines] = useState(null);
  const { filter } = useSelector((state) => state.wineModule);
  const tableEl = useRef(null);

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
        500
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
          (clientHeight / (wines.page.index + 1)) * 0.3)
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
        <WineTypesFilter filter={filter} />
        <WineAvgRateFilter filter={filter} />
        <WineGrapesFilter filter={filter} />
        <WineRegionFilter filter={filter} />
        <WineCountryFilter filter={filter} />
        <WineStyleFilter filter={filter} />
      </nav>
      <div className="wines-result" onScroll={scrollDown} ref={tableEl}>
        <WinePreviews wines={wines.data} />
      </div>
    </section>
  ) : null;
};