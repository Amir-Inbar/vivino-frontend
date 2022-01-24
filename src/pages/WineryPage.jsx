import React, { useEffect, useState } from "react";
import { WineryHeader } from "../components/WineryHeader";
import { WineryWines } from "../components/WineryWines";
import demo from "../temp/demo.json";

export function WineryPage() {
  const [winery, setWinery] = useState(demo.winery[0]);
  const [wines, setWines] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rateAvg, setRateAvg] = useState(0);

  useEffect(() => {
    setWines(demo.wines.filter((wine) => wine.wineryId === winery.id));
  }, [winery]);

  useEffect(() => {
    const wineIds = wines.map((wine) => wine.id);
    setReviews(
      demo.reviews.filter((review) => wineIds.includes(review.wineId))
    );
  }, [wines]);

  useEffect(() => {
    setRateAvg(
      (
        reviews
          .map((review) => review.rate)
          .reduce((sum, rate) => sum + rate, 0) / reviews.length
      ).toFixed(1)
    );
  }, [reviews]);

  return (
    <>
      <WineryHeader
        winery={winery}
        wines={wines}
        reviews={reviews}
        rate={rateAvg}
      />
      <WineryWines winery={winery} wines={wines} reviews={reviews} />
    </>
  );
}
