import React from "react";
import { WineSlider } from "../WineSlider";

export function WineryWines({ winery, top, popular, max = 8 }) {
  return (
    <div className="winery-details">
      {popular ? (
        <>
          <h2>Most popular</h2>
          <p>From {winery.name}</p>
          <WineSlider wines={popular} />
        </>
      ) : null}
      {top ? (
        <>
          <h2>Best rated</h2>
          <p>From {winery.name}</p>
          <WineSlider wines={top} />
        </>
      ) : null}
    </div>
  );
}
