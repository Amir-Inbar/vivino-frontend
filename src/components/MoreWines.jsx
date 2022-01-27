import React from "react";
import { WineSlider } from "./WineSlider";

export function MoreWines({ wines, winery, title, activeId }) {
  if (!wines && !winery?.wines) return null;
  const list = (wines || winery.wines).filter((wine) => wine._id !== activeId);
  return list.length ? (
    <div className="more-wines">
      <h2>{title ? title : "More wines"}</h2>
      {winery?.name ? <p>From {winery?.name}</p> : null}
      <WineSlider wines={list} />
    </div>
  ) : null;
}
