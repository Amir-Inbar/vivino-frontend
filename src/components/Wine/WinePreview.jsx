import React from "react";
import { useHistory } from "react-router-dom";
import { sentenceToKababCase, tryRequire } from "../../services/util.service";
import { StarRate } from "../StarRate";

export const WinePreviews = ({ wines }) => {
  const rtl = document.dir === "rtl";
  const history = useHistory();
  return wines.map((item, idx) => {
    const WineRate = ({ rate, ratings }) => {
      return rate ? (
        <>
          <p className="avg-rate">{rate.toFixed(1)}</p>
          <StarRate rate={rate.toFixed(1)} />
          {ratings ? (
            <p className="total-ratings">{item.ratings} ratings</p>
          ) : null}
        </>
      ) : null;
    };
    return (
      <div
        className="wine-preview"
        style={rtl ? { "flex-direction": "row-reverse" } : null}
        key={"WINE_" + idx}
        onClick={() => history.push(`/wine/${item._id}`)}
      >
        {item.background ? (
          <img
            src={item.background}
            className={rtl ? "card-wave-rtl" : "card-wave"}
            onError={({ target }) => (target.style.visibility = "hidden")}
          />
        ) : (
          ""
        )}
        <div className="preview-header">
          <div className="wine-bottle">
            <img
              className="bottle-img"
              src={item.image}
              onError={({ target }) =>
                (target.src = tryRequire("imgs/bottle.png"))
              }
            />
            <img
              src={item.image}
              onError={({ target }) =>
                (target.src = tryRequire("imgs/bottle.png"))
              }
            />
          </div>
          <div className="wine-rate">
            <WineRate rate={item.rate} ratings={item.ratings} />
          </div>
        </div>
        <div className="preview-info">
          <h5>{item.winery}</h5>
          <h4>{item.name}</h4>
          <div className="wine-country">
            <img
              src={tryRequire(
                `imgs/icons/flags/${sentenceToKababCase(item.country)}.png`,
                `imgs/icons/flags/other.png`
              )}
            />
            <span>
              {item.region}, {item.country}
            </span>
          </div>
        </div>
      </div>
    );
  });
};
