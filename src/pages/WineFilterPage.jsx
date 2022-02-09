import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WinePreviews } from "../components/Wine/WinePreview";
import { debounce, extractConditionKey } from "../services/util.service";
import { wineService } from "../services/wine.service";
import { setFilterBy } from "../store/actions/wineAction";
import useInfinityScroll from "../hooks/useInfinityScroll";
import { WineFilters } from "../components/Wine/WineFilters";
import { FilterSelection } from "../components/Filter/FilterQuerySelected";
import { FilterQuickSort } from "../components/Filter/FilterQuickSort";

export const FilterPage = (props) => {
  const dispatch = useDispatch();
  const queries = new URLSearchParams(props.location.search);
  const [wines, setWines] = useState(null);
  const [isShowFilter, setIsShowFilter] = useState(null);
  const sort = useSelector((state) => state.wineModule.sort);
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

  const isFiltered = () => filter && Object.keys(filter).length;

  useEffect(() => {
    if (!keywords) return;
    dispatch(
      setFilterBy(
        Object.values(keywords.query).reduce(
          (obj, cKey) =>
            (obj = {
              ...obj,
              [cKey]: queries.get(extractConditionKey(cKey)?.key),
            }),
          { ...filter }
        )
      )
    );
  }, [props.location.search]);

  useEffect(() => {
    debounce(
      async () => {
        try {
          const wines = await wineService.query({ filter, sort });
          setWines(wines);
          window.scrollTo(0, 0);
        } catch {}
      },
      "SEND_GET_REQ",
      1000
    );
  }, [filter, sort]);

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
            className={`filter-button ${isFiltered() ? "marked" : ""}`}
          >
            filter
          </button>
          <FilterQuickSort />
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
          {wines.total && !isShowFilter ? (
            <WinePreviews wines={wines.data} />
          ) : (
            <div>No results</div>
          )}
        </div>
      </div>
    </section>
  ) : null;
};
