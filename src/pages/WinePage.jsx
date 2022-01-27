import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoreWines } from "../components/MoreWines";
import { TastePreview } from "../components/TastePreview";
import { WineHeader } from "../components/WineHeader";
import { WineryPreview } from "../components/WineryPreview";
import { TasteLike } from "../components/WineTasteLike";
import { loadWine } from "../store/actions/wineAction";
import { loadWinery } from "../store/actions/wineryAction";
import { loadReview } from "../store/actions/reviewAction";
import { useHistory } from "react-router-dom";

export const WinePage = (props) => {
  const [taste, setTaste] = useState(null);
  const dispatch = useDispatch();
  const { wine } = useSelector((state) => state.wineModule);
  const { winery } = useSelector((state) => state.wineryModule);
  const { reviews } = useSelector((state) => state.reviewModule);
  const history = useHistory();

  useEffect(() => {
    const { id } = props.match.params;
    dispatch(loadWine(id));
    dispatch(loadReview(id, { page: { size: 4 } }));
  }, [props.match.params.id]);

  useEffect(() => {
    console.log(props.location.search);
  }, [props.location.search]);

  useEffect(() => {
    if (wine?.wineryId) dispatch(loadWinery(wine.wineryId));
  }, [wine]);

  const tasteClick = (category) => {
    setTaste(category);
    if (!category) {
      history.push(`/wine/${wine._id}`);
      return;
    }
    history.push(`?taste=${category.name}`);
    category = category.mentions.map((mention) => mention.keyword).join("|");
    dispatch(loadReview(wine._id, { filter: { inDescription: category } }));
  };

  return wine ? (
    <>
      <WineHeader wine={wine} />
      <WineryPreview winery={winery} />
      <TasteLike wine={wine} setTaste={tasteClick} />
      <TastePreview taste={taste} setTaste={tasteClick} reviews={reviews} />
      <MoreWines winery={winery} activeId={wine?._id} />
    </>
  ) : null;
};
