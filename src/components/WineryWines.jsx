import React from "react";

export function WineryWines({ wines }) {
  return <div className="winery-details">{JSON.stringify(wines)}</div>;
}
