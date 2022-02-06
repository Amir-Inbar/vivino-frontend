import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useChangeEffect from "../hooks/useChangeEffect";
import { debounce } from "../services/util.service";
import { wineService } from "../services/wine.service";
import { setFilterBy } from "../store/actions/wineAction";

export function SearchPopup(props) {
  const rtl = document.dir === "rtl";
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [wines, setWines] = useState(null);
  const filter = useSelector((state) => state.wineModule.filter);
  const [position, setPosition] = useState({});
  const elSearch = useRef(null);

  const SearchResult = ({ result, close, search }) => {
    const filter = useSelector((state) => state.wineModule.filter);
    if (location.pathname === "/wine") return null;
    if (!filter?.search || !result?.length) return null;
    const el = elSearch.current;
    const top = el.offsetTop + el.clientHeight + 16;
    const left = el.offsetLeft;
    const right = window.innerWidth - (el.offsetLeft + el.clientWidth);
    const height = document.documentElement.scrollHeight;
    const style = { top: `${top}px` };
    if (window.innerWidth > 540)
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
              const title = {
                __html: `${wine.winery.replace(
                  re,
                  `<span class="bold">$1</span>`
                )} ${wine.name.replace(re, `<span class="bold">$1</span>`)}`,
              };
              return (
                <li
                  key={"SEARCH_RESULT_" + idx}
                  onClick={() => history.push(`/wine/${wine._id}`)}
                >
                  <img src={wine.image} />
                  <p
                    data-trans={`${wine.winery}-${wine.name}`}
                    dangerouslySetInnerHTML={title}
                  ></p>
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
    // const el = target.parentElement;
    // const top = el.offsetTop + el.clientHeight + 16;
    // const left = el.offsetLeft;
    // const right = window.innerWidth - (el.offsetLeft + el.clientWidth);
    debounce(
      () => {
        dispatch(setFilterBy({ ...filter, search: target.value }));
      },
      "SET_FILTER",
      1000
    );
  };

  useChangeEffect(() => {
    if (!filter?.search) return;
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
      />
    </>
  );
}
