import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { sentenceToKababCase, tryRequire } from "../services/util.service";
import { StarRate } from "./StarRate";

const WinePreviews = ({ wines }) => {
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
        key={"WINE_" + idx}
        onClick={() => history.push(`/wine/${item._id}`)}
      >
        {item.background ? <img src={item.background} /> : ""}
        <div className="preview-header">
          <div className="wine-bottle">
            <img className="bottle-img" src={item.image} />
            <img src={item.image} />
          </div>
          <div className="wine-rate">
            <WineRate rate={item.rate} ratings={item.ratings} />
            {/* <p className="sale-status">Sold out</p> */}
          </div>
        </div>
        <div className="preview-info">
          <h5>{item.winery}</h5>
          <h4>{item.name}</h4>
          <div className="wine-country">
            <img
              src={tryRequire(
                `imgs/icons/flags/${sentenceToKababCase(item.country)}.png`
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

export const WineSlider = (props) => {
  const { wines } = props;
  const [position, setPosition] = useState(0);
  const itemPerPage = 4;

  const sliderStyle = () => {
    const sec = 2;
    const pos = position
      ? -(
          (Math.min((position + 1) * itemPerPage, wines.length) / itemPerPage) *
            100 -
          100
        )
      : 0;
    return {
      transform: `translateX(${pos}%)`,
      transition: `${-pos % 100 ? sec / (100 / (-pos % 100)) : sec}s`,
    };
  };

  return (
    <div className="wine-container">
      {wines.length > position * itemPerPage + itemPerPage ? (
        <button className="next" onClick={() => setPosition(position + 1)}>
          -
        </button>
      ) : null}
      {position ? (
        <button className="prev" onClick={() => setPosition(position - 1)}>
          -
        </button>
      ) : null}
      <div className="wine-cards">
        <div className="wine-slider" style={sliderStyle()}>
          <WinePreviews wines={wines} />
        </div>
      </div>
    </div>
  );
};
