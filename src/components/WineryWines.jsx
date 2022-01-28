import React from "react";
import { WineSlider } from "./WineSlider";

export function WineryWines({ winery, max = 8 }) {
  return (
    <div className="winery-details">
      <h2>Most popular</h2>
      <p>From {winery.name}</p>
      <WineSlider wines={winery.wines.popular} />
      <h2>Best rated</h2>
      <p>From {winery.name}</p>
      <WineSlider wines={winery.wines.top} />
    </div>
  );
}
