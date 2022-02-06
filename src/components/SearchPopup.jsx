import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import useChangeEffect from "../hooks/useChangeEffect";
import { debounce } from "../services/util.service";
import { wineService } from "../services/wine.service";
import { setFilterBy } from "../store/actions/wineAction";

export function SearchPopup(props) {
  const rtl = document.dir === "rtl";
  const history = useHistory();
  const dispatch = useDispatch();
  const [wines, setWines] = useState(null);
  const filter = useSelector((state) => state.wineModule.filter);
  const [position, setPosition] = useState({});

  const SearchResult = ({ result, position, close }) => {
    const location = useLocation();
    const filter = useSelector((state) => state.wineModule.filter);
    if (location.pathname === "/wine") return null;
    if (!filter?.search || !result?.length) return null;
    return (
      <div
        className="background-dimm"
        style={{
          height: document.documentElement.scrollHeight + "px",
        }}
        onClick={close}
      >
        <div className="quick-search-result" style={position}>
          <ul>
            {result.map((wine, idx) => {
              return (
                <li
                  key={"SEARCH_RESULT_" + idx}
                  onClick={() => history.push(`/wine/${wine._id}`)}
                >
                  <img src={wine.image} />
                  <span data-trans={wine.name}>
                    {wine.winery} {wine.name}
                  </span>
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
    const top =
      target.parentElement.offsetTop + target.parentElement.clientHeight + 16;
    const left = target.parentElement.offsetLeft;
    const right =
      window.innerWidth -
      (target.parentElement.offsetLeft + target.parentElement.clientWidth);
    debounce(
      () => {
        setPosition(
          rtl
            ? { top: `${top}px`, right: `${right}px` }
            : { top: `${top}px`, left: `${left}px` }
        );
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

  return (
    <>
      <div className="search">
        <input
          placeholder="Search any wine"
          onInput={searchInput}
          onFocus={searchInput}
        ></input>
      </div>
      <SearchResult result={wines?.data} position={position} close={cleanUp} />
    </>
  );
}
