import React, { useEffect, useState } from "react";
import { wineService } from "../services/wine.service";
import { WineSlider } from "./WineSlider";

export function MoreWines({ title, wine }) {
  const [wines, setWines] = useState(null);

  useEffect(async () => {
    if (!wine) return;
    const res = await wineService.query({
      filter: {
        eqCountry: wine.country,
        eqWinery: wine.winery,
        ne_id: wine._id,
      },
      page: { size: 8 },
    });
    setWines(res);
  }, [wine._id]);

  if (!wines?.data) return null;
  return wines?.data?.length ? (
    <div className="more-wines">
      <h2>{title ? title : "More wines"}</h2>
      {wine?.winery ? <p>From {wine?.winery}</p> : null}
      <WineSlider wines={wines.data} />
    </div>
  ) : null;
}
