import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelectFilter } from "../components/Filter/FilterMultiSelect";
import { WinePreviews } from "../components/Wine/WinePreview";
import { debounce } from "../services/util.service";
import { wineService } from "../services/wine.service";
import { setFilterBy } from "../store/actions/wineAction";
import { ScaleRangeFilter } from "../components/Filter/FilterSelectRange";
import useInfinityScroll from "../hooks/useInfinityScroll";

export const FilterPage = (props) => {
  const dispatch = useDispatch();
  const queries = new URLSearchParams(props.location.search);
  const [wines, setWines] = useState(null);
  const [isShowFilter, setIsShowFilter] = useState(null);
  const filter = useSelector((state) => state.wineModule.filter);
  const keywords = useSelector((state) => state.wineModule.keywords);

  useInfinityScroll(
    async () => {
      const res = await wineService.query({
        filter,
        page: { index: wines.page.index + 1 },
      });
      if (res) setWines({ ...res, data: [...wines.data, ...res.data] });
    },
    [wines],
    wines?.page.index < wines?.page.total
  );

  const queryToFilter = () =>
    dispatch(
      setFilterBy({
        ...filter,
        eqType: queries.get("type"),
        inRegion: queries.get("region"),
        "in+Grapes": queries.get("grapes"),
        inCountry: queries.get("country"),
        inSeo: queries.get("seo"),
        inPairings: queries.get("pairings"),
      })
    );

  useEffect(() => {
    debounce(() => queryToFilter(), "SET_FILTER", filter ? 500 : 0);
  }, [props.location.search]);

  useEffect(() => {
    (async () => {
      try {
        const wines = await wineService.query({ filter });
        setWines(wines);
        window.scrollTo(0, 0);
      } catch {}
    })();
  }, [filter]);

  return wines && keywords ? (
    <section className="wines-filter">
      <div className="control-panel">
        <button
          onClick={() => setIsShowFilter(true)}
          className={`${queries.toString() ? "marked" : ""}`}
        >
          filter
        </button>
        <button>sort</button>
      </div>
      <nav
        className="filter-menu"
        style={isShowFilter ? { display: "block" } : null}
      >
        <div className="title">filters</div>
        <MultiSelectFilter
          title="wine type"
          query="eqType"
          data={keywords.types}
        />
        <ScaleRangeFilter
          title="average rating"
          fromQuery="from"
          toQuery="to"
        />
        <MultiSelectFilter
          title="Grapes"
          query="in+Grapes"
          data={keywords.grapes}
        />
        <MultiSelectFilter
          title="regions"
          query="inRegion"
          data={keywords.regions}
          max={6}
        />
        <MultiSelectFilter
          title="countries"
          query="inCountry"
          data={[...new Set(keywords.regions.map((val) => val.country))].map(
            (val) => ({ name: val })
          )}
          max={6}
        />
        <MultiSelectFilter
          title="wine styles"
          query="inSeo"
          data={keywords.styles}
        />
        <MultiSelectFilter
          title="food pairings"
          query="inPairings"
          data={keywords.food}
        />
        <div className="apply">
          <button onClick={() => setIsShowFilter(false)}>close</button>
        </div>
      </nav>
      <div className="wines-result">
        {wines.total ? (
          <WinePreviews wines={wines.data} />
        ) : (
          <div>No results</div>
        )}
      </div>
    </section>
  ) : null;
};
