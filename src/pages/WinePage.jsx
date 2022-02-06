import { useEffect, useState } from "react";
import { MoreWines } from "../components/Wine/WineMoreFrom";
import { TastePreview } from "../components/Wine/Taste/WineTastePreview";
import { WineHeader } from "../components/Wine/WineHeader";
import { WineryPreview } from "../components/Winery/WineryPreview";
import { TasteLike } from "../components/Wine/Taste/WineTasteLike";
import { wineService } from "../services/wine.service";
import { WinePairings } from "../components/Wine/WinePairings/WinePairings";
import { WineReviews } from "../components/Wine/Review/WineReviews";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export const WinePage = (props) => {
  const [wine, setWine] = useState(null);

  const location = useLocation();
  const getQuery = (name) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(name)?.split("-") || [];
  };

  useEffect(async () => {
    const { id } = props.match.params;
    const wine = await wineService.getById(id);
    setWine(wine);
  }, [props.match.params.id]);

  return wine ? (
    <>
      <WineHeader wine={wine} />
      <WineryPreview wine={wine} />
      <TasteLike wine={wine} />
      <TastePreview wine={wine} query={getQuery("taste").toString()} />
      <WinePairings wine={wine} />
      <WineReviews wineId={wine._id} wine={wine} />
      <MoreWines wine={wine} />
    </>
  ) : null;
};
