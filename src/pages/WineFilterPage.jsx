import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WinePreviews } from "../components/Wine/WinePreview";
import { debounce } from "../services/util.service";
import { wineService } from "../services/wine.service";
import { setFilterBy } from "../store/actions/wineAction";
import useInfinityScroll from "../hooks/useInfinityScroll";
import { WineFilters } from "../components/Wine/WineFilters";
import { FilterSelection } from "../components/Filter/FilterQuerySelected";

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

  const queryToFilter = () => {
    dispatch(
      setFilterBy({
        ...filter,
        eqType: queries.get("type"),
        inRegion: queries.get("region"),
        "in+Grapes": queries.get("grapes"),
        inCountry: queries.get("country"),
        inStyle: queries.get("style"),
        inPairings: queries.get("pairings"),
      })
    );
  };

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
    <section className="filter-continaer">
      <div className="control-panel">
        <FilterSelection
          filter={filter}
          keywords={keywords}
          count={wines.total}
        />
        <div className="buttons">
          <button
            onClick={() => setIsShowFilter(true)}
            className={`filter-button ${queries.toString() ? "marked" : ""}`}
          >
            filter
          </button>
          <button className={`sort-button`}>sort</button>
        </div>
      </div>
      <div className="wines-filter">
        <nav
          className="filter-menu"
          style={isShowFilter ? { display: "block" } : null}
        >
          <div className="title">filters</div>
          {/* <ScaleRangeFilter
          title="average rating"
          fromQuery="from"
          toQuery="to"
        /> */}
          <WineFilters keywords={keywords} />
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
      </div>
    </section>
  ) : null;
};
