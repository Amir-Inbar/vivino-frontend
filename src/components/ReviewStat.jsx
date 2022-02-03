import { tryRequire } from '../services/util.service';
import { WineRate } from './WineRatePreview';

export const ReviewStat = ({ wine }) => {
  console.log('wine :>> ', wine);

  const setRatingBar = (rating) => {
    if (!parseInt(rating)) return 0;
    console.log(parseInt(rating) / wine.ratings);
    return parseInt(rating) / wine.ratings;
  };
  let totalStars = 6;
  let total = 5;
  return (
    <div className="review-stat">
      <WineRate rate={wine.rate} ratings={wine.ratings} />
      <div className="saperate"></div>
      <div className="rate-line flex column ">
        {[...Array(total)].map((el, idx) => (
          <div className="flex" style={{ 'margin-block-end': '20px' }}>
            <div className="stars flex">
              {[...Array((totalStars -= 1))].map(() => (
                <img src={tryRequire('imgs/icons/single-star.svg')} alt="" />
              ))}
            </div>
            <div className="background-bar">
              <div
                className="background-fill"
                style={{
                  width: setRatingBar(`${wine[`rate${idx + 1}`]}`) * 134 + 'px',
                  height: '16px',
                }}
              ></div>
            </div>
            <span>{`${wine[`rate${idx + 1}`]}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};