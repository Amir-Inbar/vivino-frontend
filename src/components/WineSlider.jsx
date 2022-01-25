import React, { useState } from "react";
import { sentenceToKababCase } from "../services/util.service";
import { StarRate } from "./StarRate";

export function WineSlider(props) {
  const { reviews } = props;
  const [position, setPosition] = useState(0);
  const itemPerPage = 4;

  const wines = [
    ...props.wines,
    ...props.wines,
    ...props.wines,
    ...props.wines,
    ...props.wines,
    ...props.wines,
    ...props.wines,
    ...props.wines,
    ...props.wines,
    ...props.wines,
    ...props.wines,
    ...props.wines,
  ];

  const display = () => {
    return wines.map((item, idx) => {
      const wineReviews =
        reviews?.filter((review) => review.wineId === item.id) || [];
      const avgRate = (
        wineReviews.reduce((sum, review) => (sum = sum + review.rate), 0) /
        wineReviews.length
      ).toFixed(1);
      return (
        <div
          className="wine-preview"
          style={{
            width: `calc(100% / ${itemPerPage} - 8px)`,
            margin: `0px 4px`,
          }}
          key={"WINE_" + idx}
        >
          <div className="preview-header">
            <div className="wine-bottle">
              <img className="bottle-img" src={item.image} />
              <img src={item.image} />
            </div>
            <div className="wine-rate">
              <p className="avg-rate">{avgRate}</p>
              <StarRate rate={avgRate} />
              <p className="total-ratings">{wineReviews.length} ratings</p>
              <p className="sale-status">Sold out</p>
            </div>
          </div>
          <div className="preview-info">
            <h5>{item.winery}</h5>
            <h4>{item.name}</h4>
            <div className="wine-country">
              <img
                src={require(`../assets/imgs/icons/flags/${sentenceToKababCase(
                  item.country
                )}.png`)}
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
          {display()}
        </div>
      </div>
    </div>
  );
}
