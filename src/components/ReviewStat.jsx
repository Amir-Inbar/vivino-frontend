import { tryRequire } from "../services/util.service";
import { WineRate } from "./WineRatePreview";

export const ReviewStat = ({ wine }) => {
  console.log("wine :>> ", wine);

  const setRatingBar = (rating) => {
    if (!parseInt(rating)) return 0;
    console.log(parseInt(rating) / wine.ratings);
    return parseInt(rating) / wine.ratings;
  };
  const total = 5;
  return (
    <div className="review-stat">
      <WineRate rate={wine.rate} ratings={wine.ratings} />
      <div className="saperate"></div>
      <div className="rate-line flex column ">
        {[...Array(total)].map((el, idx) => {
          return (
            <div
              className="flex"
              style={{ "margin-block-end": "20px" }}
              key={`STAT_SCALE_${idx}`}
            >
              <div className="stars flex">
                {[...Array(total - idx)].map((el, idx2) => (
                  <img
                    src={tryRequire("imgs/icons/single-star.svg")}
                    alt="star"
                    key={`IMG_STAT_${idx}_${idx2}`}
                  />
                ))}
              </div>
              <div className="background-bar">
                <div
                  className="background-fill"
                  style={{
                    width:
                      setRatingBar(`${wine[`rate${total - idx}`]}`) * 134 +
                      "px",
                    height: "16px",
                  }}
                ></div>
              </div>
              <span>{`${wine[`rate${total - idx}`]}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
