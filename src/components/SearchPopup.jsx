import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useChangeEffect from "../hooks/useChangeEffect";
import { debounce } from "../services/util.service";
import { wineService } from "../services/wine.service";
import { setFilterBy } from "../store/actions/wineAction";
import { mediaQuery } from "./AppHeader";

export function SearchPopup(props) {
  const rtl = document.dir === "rtl";
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [wines, setWines] = useState(null);
  const filter = useSelector((state) => state.wineModule.filter);
  const elSearch = useRef(null);

  const SearchResult = ({ result, close, search, el }) => {
    const filter = useSelector((state) => state.wineModule.filter);
    if (location.pathname === "/wine") return null;
    if (!filter?.search || !result?.length) return null;
    const top = el.offsetTop + el.clientHeight + 16;
    const left = el.offsetLeft;
    const right = window.innerWidth - (el.offsetLeft + el.clientWidth);
    const height = document.documentElement.scrollHeight;
    const style = { top: `${top}px` };
    if (window.innerWidth > mediaQuery.mobile)
      if (rtl) style.right = `${right}px`;
      else style.left = `${left}px`;
    return (
      <div
        className="background-dimm"
        style={{ height: height + "px" }}
        onClick={close}
      >
        <div className="quick-search-result" style={style}>
          <ul>
            {result.map((wine, idx) => {
              const re = new RegExp(`(${search})`, "gi");
              const p1 = `${wine.winery} ${wine.name}`;
              const p2 = `${wine.region}, ${wine.country}`;
              const html = (text) => ({
                __html: text.replace(re, `<span class="bold">$1</span>`),
              });
              return (
                <li
                  key={"SEARCH_RESULT_" + idx}
                  onClick={() => history.push(`/wine/${wine._id}`)}
                >
                  <img src={wine.image} />
                  <div className="title">
                    <p
                      data-trans={`${wine.winery}-${wine.name}`}
                      dangerouslySetInnerHTML={html(p1)}
                    ></p>
                    {/* <p dangerouslySetInnerHTML={html(p2)}></p> */}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const cleanUp = () => {
    setWines(null);
    dispatch(setFilterBy({ ...filter, search: null }));
  };

  const searchInput = ({ target }) => {
    if (!target.value) {
      cleanUp();
      return;
    }
    debounce(
      () => {
        dispatch(setFilterBy({ ...filter, search: target.value }));
      },
      "SET_FILTER",
      500
    );
  };

  useChangeEffect(() => {
    if (!filter?.search || location.pathname === "/wine") return;
    (async () => {
      try {
        const wines = await wineService.query({ filter });
        setWines(wines);
      } catch {}
    })();
  }, [filter]);

  const searchStyle =
    filter?.search && location.pathname !== "/wine"
      ? { position: "relative", zIndex: "100" }
      : {};

  return (
    <>
      <div className="search" style={searchStyle} ref={elSearch}>
        <input
          placeholder="Search any wine"
          onInput={searchInput}
          onFocus={searchInput}
          spellCheck="false"
        ></input>
      </div>
      <SearchResult
        result={wines?.data}
        search={filter?.search}
        close={cleanUp}
        el={elSearch.current}
      />
    </>
  );
}
