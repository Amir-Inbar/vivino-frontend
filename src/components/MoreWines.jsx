import React from "react";
import { WineSlider } from "./WineSlider";

export function MoreWines({ wines, winery, title, activeId }) {
  if (!wines?.data) return null;
  return wines?.data?.length ? (
    <div className="more-wines">
      <h2>{title ? title : "More wines"}</h2>
      {winery?.name ? <p>From {winery?.name}</p> : null}
      <WineSlider wines={wines.data} />
    </div>
  ) : null;
}
