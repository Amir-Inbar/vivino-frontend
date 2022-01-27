import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoreWines } from "../components/MoreWines";
import { TastePreview } from "../components/TastePreview";
import { WineHeader } from "../components/WineHeader";
import { WineryPreview } from "../components/WineryPreview";
import { WineSlider } from "../components/WineSlider";
import { TasteLike } from "../components/WineTasteLike";
import { loadWine } from "../store/actions/wineAction";
import { loadWinery } from "../store/actions/wineryAction";

export const WinePage = () => {
  const [taste, setTaste] = useState(null);
  const dispatch = useDispatch();
  const { wine } = useSelector((state) => state.wineModule);
  const { winery } = useSelector((state) => state.wineryModule);

  useEffect(() => {
    dispatch(loadWine(2));
  }, [dispatch]);

  useEffect(() => {
    if (wine?.wineryId) dispatch(loadWinery(wine.wineryId));
  }, [wine]);

  return wine ? (
    <>
      <WineHeader wine={wine} />
      <WineryPreview winery={winery} />
      <TasteLike wine={wine} setTaste={setTaste} />
      <TastePreview reviews={wine.reviews} taste={taste} setTaste={setTaste} />
      <MoreWines winery={winery} />
    </>
  ) : null;
};
