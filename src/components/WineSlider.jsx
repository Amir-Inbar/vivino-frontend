import React, { useState } from "react";
import { WinePreviews } from "./WinePreview";

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
        <button
          className="next"
          onClick={() => setPosition(position + 1)}
        ></button>
      ) : null}
      {position ? (
        <button
          className="back"
          onClick={() => setPosition(position - 1)}
        ></button>
      ) : null}
      <div className="wine-cards">
        <div className="wine-slider" style={sliderStyle()}>
          <WinePreviews wines={wines} />
        </div>
      </div>
    </div>
  );
};
