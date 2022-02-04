import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { debounce, tryRequire } from "../services/util.service";
import { setFilterBy } from "../store/actions/wineAction";
import { PopupMenu } from "./PopupMenu";

export function AppHeader() {
  const location = useLocation();
  const [popupConfig, setPopupConfig] = useState(0);
  const { filter } = useSelector((state) => state.wineModule);
  const dispatch = useDispatch();

  useEffect(() => {
    if (popupConfig) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "initial";
  }, [popupConfig]);

  if (location.pathname === "/login") return null;

  const toggleMenu = (ev, type) =>
    popupConfig?.type === type
      ? setPopupConfig(null)
      : setPopupConfig({ target: ev.target, type });

  const searchInput = ({ target }) => {
    debounce(
      () => dispatch(setFilterBy({ ...filter, search: target.value })),
      "SET_FILTER",
      1000
    );
  };

  return (
    <header className="app-header">
      <PopupMenu config={popupConfig} close={() => setPopupConfig(null)} />
      <div className="control-bar">
        <div className="logo">
          {/* <img src={tryRequire("imgs/logo.svg")} /> */}
        </div>
        <div className="search">
          <input placeholder="Search any wine" onInput={searchInput}></input>
        </div>
      </div>
      <nav>
        <ul>
          <li className="wines" onClick={(ev) => toggleMenu(ev, "wines")}>
            <img src={tryRequire("imgs/icons/wines.svg")} />
            <span>Wines</span>
          </li>
          <li className="pairings">
            <img src={tryRequire("imgs/icons/cheese.svg")} />
            <span>Pairings</span>
          </li>
          <li className="grapes">
            <img src={tryRequire("imgs/icons/grapes.svg")} />
            <span>Grapes</span>
          </li>
          <li className="regions">
            <img src={tryRequire("imgs/icons/regions.svg")} />
            <span>Regions</span>
          </li>
          <li className="awards">
            <img src={tryRequire("imgs/icons/awards.svg")} />
            <span>Awards</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
