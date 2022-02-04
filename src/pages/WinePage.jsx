import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MoreWines } from '../components/MoreWines';
import { TastePreview } from '../components/TastePreview';
import { WineHeader } from '../components/WineHeader';
import { WineryPreview } from '../components/WineryPreview';
import { TasteLike } from '../components/WineTasteLike';
import { loadReview } from '../store/actions/reviewAction';
import { wineService } from '../services/wine.service';
import { reviewService } from '../services/review.service';
import { WinePairings } from '../components/WinePairings';
import { WineReviews } from '../components/WineReviews';
import { StarRate } from '../components/StarRate';
import { AddReview } from '../components/AddReview';
import { authService } from '../services/auth.service';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { wineryService } from '../services/winery.service';
import { getCurrentPosition } from '../services/util.service';

export const WinePage = (props) => {
  const [wine, setWine] = useState(null);
  const [wines, setWines] = useState(null);
  const [winery, setWinery] = useState(null);
  const dispatch = useDispatch();

  const location = useLocation();
  const getQuery = (name) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(name)?.split('-') || [];
  };

  useEffect(async () => {
    const { id } = props.match.params;
    const wine = await wineService.getById(id);
    if (wine) {
      if (wine?.wineryId) {
        const location = await getCurrentPosition();
        const winery = await wineryService.getById(wine.wineryId, {
          ...location,
        });
        setWinery(winery);
      }
      await loadMoreWines();
    }
    setWine(wine);
  }, [props.match.params.id]);

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

  return wine ? (
    <>
      <WineHeader wine={wine} />
      <WineryPreview winery={winery} />
      <TasteLike wine={wine} />
      <TastePreview wine={wine} query={getQuery('taste').toString()} />
      <WinePairings wine={wine} />
      <MoreWines wines={wines} activeId={wine?._id} />
      <WineReviews wineId={wine._id} wine={wine} />
    </>
  ) : null;
};
