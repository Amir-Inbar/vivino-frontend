import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {
  getShortSentence,
  sentenceToKababCase,
  tryRequire,
} from "../../../services/util.service";

function getDescription(mentions) {
  const desc = mentions.map((taste) => taste.keyword).join(", ");
  return getShortSentence(desc);
}

export function TasteFill(props) {
  const location = useLocation();
  const history = useHistory();
  const { tastes } = props;
  const [position, setPosition] = useState(0);
  const rtl = document.dir === "rtl";
  if (!tastes || !tastes.length) return null;

  const setQuery = (name, value) => {
    const queryParams = new URLSearchParams(location.search);
    if (value) queryParams.set(name, value);
    else queryParams.delete(name);
    history.replace({ search: queryParams.toString() });
  };

  const display = () => {
    return tastes.map((taste, idx) => {
      const url = tryRequire(
        `imgs/icons/taste/${sentenceToKababCase(taste.name)}.svg`
      );
      return (
        <div
          className="taste-fill-preview"
          key={"TASTE_FILL_" + idx}
          onClick={() => setQuery("taste", taste.name)}
        >
          <div className="picture" style={{ backgroundColor: taste.color }}>
            <img src={url} alt={taste.name} />
          </div>
          <h3>{getDescription(taste.mentions)}</h3>
          <p>
            {taste.total} mentions of{" "}
            <span style={{ color: taste.color }}>{taste.name}</span> notes
          </p>
        </div>
      );
    });
  };

  const sliderStyle = () => {
    const sec = 2;
    const pos = position
      ? -((Math.min((position + 1) * 3, tastes.length) / 3) * 100 - 100)
      : 0;
    return {
      transform: `translateX(${rtl ? -pos : pos}%)`,
      transition: `${-pos % 100 ? sec / (100 / (-pos % 100)) : sec}s`,
    };
  };

  const nextEnabled = () => (rtl ? position : tastes.length > position * 3 + 3);
  const backEnabled = () => (rtl ? tastes.length > position * 3 + 3 : position);

  return (
    <div className="taste-fill">
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
      <div className="taste-cards">
        <div className="taste-slider" style={sliderStyle()}>
          {display()}
        </div>
      </div>
    </div>
  );
}
