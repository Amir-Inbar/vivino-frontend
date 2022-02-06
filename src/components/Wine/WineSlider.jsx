import React, { useState } from "react";
import { WinePreviews } from "./WinePreview";

export const WineSlider = (props) => {
  const rtl = document.dir === "rtl";
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
      transform: `translateX(${rtl ? -pos : pos}%)`,
      transition: `${-pos % 100 ? sec / (100 / (-pos % 100)) : sec}s`,
    };
  };

  const nextEnabled = () =>
    rtl ? position : wines.length > position * itemPerPage + itemPerPage;
  const backEnabled = () =>
    rtl ? wines.length > position * itemPerPage + itemPerPage : position;

  return (
    <div className="wine-container">
      {nextEnabled() ? (
        <button
          className="next"
          onClick={() => setPosition(rtl ? position - 1 : position + 1)}
        ></button>
      ) : null}
      {backEnabled() ? (
        <button
          className="back"
          onClick={() => setPosition(rtl ? position + 1 : position - 1)}
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
