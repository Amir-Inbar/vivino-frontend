import { tryRequire } from '../services/util.service';
import { WineRate } from './WineRatePreview';

export const ReviewStat = ({ wine }) => {
  let totalStars = 6;
  let total = 5;
  return (
    <div className="review-stat">
      <WineRate rate={wine.rate} ratings={wine.ratings} />
      <div className="saperate"></div>
      <div className="rate-line flex column ">
        {[...Array(total)].map(() => (
          <div className="flex" style={{ 'margin-block-end': '20px' }}>
            <div className="stars flex">
              {[...Array((totalStars -= 1))].map(() => (
                <img src={tryRequire('imgs/icons/single-star.svg')} alt="" />
              ))}
            </div>

            <div className="background-bar">
              <div className="background-fill"></div>
            </div>
            <span> {wine.ratings}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
