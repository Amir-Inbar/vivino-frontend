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
import { wineService } from "../services/wine.service";
import { reviewService } from "../services/review.service";
import { WinePairings } from "../components/WinePairings";
import { WineReviews } from "../components/WineReviews";
import { StarRate } from "../components/StarRate";
import { AddReview } from "../components/AddReview";
import { authService } from "../services/auth.service";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { wineryService } from "../services/winery.service";
import { getCurrentPosition } from "../services/util.service";

export const WinePage = (props) => {
  const [userReviews, setReviews] = useState([]);
  const [wine, setWine] = useState(null);
  const [wines, setWines] = useState(null);
  const [winery, setWinery] = useState(null);
  const [rate, setRate] = useState(null);
  const dispatch = useDispatch();

  const location = useLocation();
  const getQuery = (name) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(name)?.split("-") || [];
  };

  useEffect(async () => {
    const { id } = props.match.params;
    const wine = await wineService.getById(id);
    setWine(wine);
    dispatch(loadReview(id, { page: { size: 4 } }));
  }, [props.match.params.id]);

  useEffect(async () => {
    if (wine?.wineryId) {
      const location = await getCurrentPosition();
      const winery = await wineryService.getById(wine.wineryId, {
        ...location,
      });
      setWinery(winery);
    }
    loadMoreWines();
    loadUserReviews();
  }, [wine]);

  const loadMoreWines = async () => {
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
  };

  const loadUserReviews = async () => {
    const user = authService.getLoggedinUser();
    if (!wine || !user?._id) return;
    const res = await reviewService.query({ filter: { eqWineId: wine._id } });
    setReviews(res.data ? [] : res || []);
  };

  const reviewUpdate = (result) => {
    setRate(null);
    if (!result || !userReviews) return;
    const reviewIdx = userReviews.find((review) => review._id === result._id);
    if (reviewIdx > -1) setReviews(userReviews.splice(reviewIdx, 1, result));
    else setReviews([result, ...userReviews]);
    dispatch(loadReview(wine._id, { page: { size: 4 } }));
  };

  return wine ? (
    <>
      <WineHeader wine={wine} />
      <WineryPreview winery={winery} />
      <TasteLike wine={wine} />
      <TastePreview wine={wine} query={getQuery("taste").toString()} />
      <WinePairings wine={wine} />
      <MoreWines wines={wines} activeId={wine?._id} />
      <WineReviews wineId={wine._id} wine={wine} />
      <StarRate size={24} rate={rate} isEditable={true} set={setRate} />
      <AddReview
        rate={rate}
        wine={wine}
        reviews={userReviews}
        set={setRate}
        close={(review) => reviewUpdate(review)}
      />
    </>
  ) : null;
};
