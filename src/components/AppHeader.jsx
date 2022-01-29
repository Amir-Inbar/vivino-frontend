import { useState } from "react";
import { tryRequire } from "../services/util.service";
import { PopupMenu } from "./PopupMenu";

export function AppHeader() {
  const [popupConfig, setPopupConfig] = useState(0);

  const toggleMenu = (ev, type) =>
    popupConfig?.type === type
      ? setPopupConfig(null)
      : setPopupConfig({ target: ev.target, type });

  return (
    <header className="app-header">
      <PopupMenu config={popupConfig} close={() => setPopupConfig(null)} />
      <div className="control-bar">
        <div className="logo">
          <img src={tryRequire("imgs/logo.svg")} />
        </div>
        <div className="search">
          <input placeholder="Search any wine"></input>
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
