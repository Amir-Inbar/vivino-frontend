import { WineHeader } from "../components/WineHeader";
import { WineryPreview } from "../components/WineryPreview";
import { TasteLike } from "../components/WineTasteLike";
import demo from "../temp/wines.json";

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
  return (
    <>
      <WineHeader wine={wine} />
      <WineryPreview winery={wine.winery} />
      <TasteLike wine={wine} />
    </>
  );
};
