import { StarRate } from './StarRate';

export const WineRate = ({ rate, ratings }) => {
  return rate && ratings ? (
    <div className="rate">
      <div className="avg">{rate.toFixed(1)}</div>
      <div className="more-info">
        <StarRate rate={rate} />
        <div className="num-ratings">{ratings} ratings</div>
      </div>
    </div>
  ) : null;
};
