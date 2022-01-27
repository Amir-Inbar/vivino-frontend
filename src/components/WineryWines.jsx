import React from "react";
import { WineSlider } from "./WineSlider";

export function WineryWines({ winery, max = 8 }) {
  const bestRated = winery.wines.sort((a, b) => b.rate - a.rate).slice(0, max);
  const mostPopular = winery.wines
    .sort((a, b) => b.ratings - a.ratings)
    .slice(0, max);
  return (
    <div className="winery-details">
      <h2>Most Popular</h2>
      <p>From {winery.name}</p>
      <WineSlider wines={mostPopular} />
      <h2>Best Rated</h2>
      <p>From {winery.name}</p>
      <WineSlider wines={bestRated} />
    </div>
  );
}
