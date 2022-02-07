import { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { tryRequire } from "../services/util.service";
import { PopupMenu } from "./PopupMenu";
import { SearchPopup } from "./SearchPopup";
import { UserPopupMenu } from "./UserQuickMenu/UserPopupMenu";

export const mediaQuery = { mobile: 540 };

export function AppHeader() {
  const location = useLocation();
  const history = useHistory();
  const [popupConfig, setPopupConfig] = useState(0);

  useEffect(() => {
    if (popupConfig) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "initial";
  }, [popupConfig]);

  if (location.pathname === "/login") return null;

  const toggleMenu = (ev, type) =>
    popupConfig?.type === type
      ? setPopupConfig(null)
      : setPopupConfig({ target: ev.target, type });

  return (
    <header className="app-header">
      <div className="logo">
        <img
          src={tryRequire("imgs/logo.png")}
          onClick={() => history.push("/")}
        />
      </div>
      <div className="control-bar">
        <div className="main-controls">
          <SearchPopup />
          <div className="side-controls">
            <UserPopupMenu />
          </div>
        </div>
        <PopupMenu config={popupConfig} close={() => setPopupConfig(null)} />
        <nav>
          <ul>
            <li className="wines" onClick={(ev) => toggleMenu(ev, "wines")}>
              <img src={tryRequire("imgs/icons/wines.svg")} />
              <span data-trans="wines">wines</span>
            </li>
            {/* <li className="pairings">
              <img src={tryRequire("imgs/icons/cheese.svg")} />
              <span data-trans="pairings">pairings</span>
            </li>
            <li className="grapes">
              <img src={tryRequire("imgs/icons/grapes.svg")} />
              <span data-trans="grapes">grapes</span>
            </li>
            <li className="regions">
              <img src={tryRequire("imgs/icons/regions.svg")} />
              <span data-trans="regions">regions</span>
            </li>
            <li className="awards">
              <img src={tryRequire("imgs/icons/awards.svg")} />
              <span data-trans="awards">awards</span>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
