import { useEffect, useState } from "react";
import { MoreWines } from "../components/WineMoreFrom";
import { TastePreview } from "../components/WineTastePreview";
import { WineHeader } from "../components/WineHeader";
import { WineryPreview } from "../components/Winery/WineryPreview";
import { TasteLike } from "../components/WineTasteLike";
import { wineService } from "../services/wine.service";
import { WinePairings } from "../components/WinePairings";
import { WineReviews } from "../components/WineReviews";
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
      <MoreWines wine={wine} />
      <WineReviews wineId={wine._id} wine={wine} />
    </>
  ) : null;
};
