import React from "react";
import { WineSlider } from "./WineSlider";

export function MoreWines({ wines, winery, title }) {
  return wines || winery ? (
    <div className="more-wines">
      <h2>{title ? title : "More wines"}</h2>
      {winery?.name ? <p>From {winery?.name}</p> : null}
      <WineSlider wines={wines || winery?.wines} />
    </div>
  ) : null;
}
