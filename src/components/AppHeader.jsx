import { useState } from "react";
import { PopupMenu } from "./PopupMenu";

export function AppHeader() {
  const [popupConfig, setPopupConfig] = useState(0);

  return (
    <header className="app-header">
      <PopupMenu config={popupConfig} />
      <div className="control-bar">
        <div className="logo">
          <img src={require("../assets/imgs/logo.svg").default} />
        </div>
        <div className="search">
          <input placeholder="Search any wine"></input>
        </div>
      </div>
      <nav>
        <ul>
          <li
            className="wines"
            onClick={(ev) => setPopupConfig({ target: ev.target, type: null })}
          >
            <img src={require("../assets/imgs/icons/wines.svg").default} />
            <span>Wines</span>
          </li>
          <li className="pairings">
            <img src={require("../assets/imgs/icons/cheese.svg").default} />
            <span>Pairings</span>
          </li>
          <li className="grapes">
            <img src={require("../assets/imgs/icons/grapes.svg").default} />
            <span>Grapes</span>
          </li>
          <li className="regions">
            <img src={require("../assets/imgs/icons/regions.svg").default} />
            <span>Regions</span>
          </li>
          <li className="awards">
            <img src={require("../assets/imgs/icons/awards.svg").default} />
            <span>Awards</span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
