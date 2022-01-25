import { useState } from "react";
import { TastePreview } from "../components/TastePreview";
import { WineHeader } from "../components/WineHeader";
import { WineryPreview } from "../components/WineryPreview";
import { TasteLike } from "../components/WineTasteLike";
import demo from "../temp/demo.json";

// DEMO DATA
const AGGREGATED_DATA = demo.wines.map((wine) => {
  const reviews = demo.reviews.filter((review) => review.wineId === wine.id);
  return {
    ...wine,
    winery:
      demo.winery.find((winery) => winery.id === wine.wineryId) || wine.winery,
    reviews,
  };
});

export const WinePage = () => {
  const wine = AGGREGATED_DATA[1];
  const [taste, setTaste] = useState(null);

  return (
    <>
      {/* <p>{JSON.stringify(taste)}</p> */}
      <WineHeader wine={wine} />
      <WineryPreview winery={wine.winery} />
      <TasteLike wine={wine} setTaste={setTaste} />
      <TastePreview reviews={wine.reviews} taste={taste} setTaste={setTaste} />
    </>
  );
};
