import React from "react";
import { WineSlider } from "./WineSlider";

export function WineryWines({ wines, winery, reviews }) {
  return (
    <div className="winery-details">
      <h2>Most Popular</h2>
      <p>From {winery.name}</p>
      <WineSlider wines={wines} reviews={reviews} />
      <h2>Best Rated</h2>
      <p>From {winery.name}</p>
      <WineSlider wines={wines} reviews={reviews} />
    </div>
  );
}
