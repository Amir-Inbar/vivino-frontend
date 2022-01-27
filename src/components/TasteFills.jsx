import React, { useEffect, useState } from "react";
import {
  getShortSentence,
  sentenceToKababCase,
} from "../services/util.service";

export function TasteFill(props) {
  const { tastes, reviews, setTaste } = props;
  const [position, setPosition] = useState(0);
  if (!reviews) return null;

  function getDescription(mentions) {
    const desc = mentions.map((taste) => taste.keyword).join(", ");
    return getShortSentence(desc);
  }

  const tastesReducer = tastes
    .map((taste) => {
      const url = require(`../assets/imgs/icons/taste/${sentenceToKababCase(
        taste.name
      )}.svg`);
      var total = 0;
      const mentions = taste.mentions
        .map((keyword) => {
          const count = reviews.reduce((sum, review) => {
            const re = new RegExp(
              `\\b(${keyword}|${keyword.replace(" ", "")})\\b`,
              "gi"
            );
            const found = review.description.match(re) || [];
            total += found.length;
            sum += found.length;
            return sum;
          }, 0);
          return { keyword, count };
        })
        .filter((mention) => !!mention.count)
        .sort((a, b) => b.count - a.count);
      return {
        ...taste,
        description: getDescription(mentions),
        mentions,
        total,
        url,
      };
    })
    .filter((taste) => !!taste.mentions.length)
    .sort((a, b) => b.total - a.total);

  const display = () => {
    return tastesReducer.map((item, idx) => {
      return (
        <div
          className="taste-fill-preview"
          key={"TASTE_FILL_" + idx}
          onClick={() => setTaste(item)}
        >
          <div className="picture" style={{ backgroundColor: item.color }}>
            <img src={item.url} />
          </div>
          <h3>{item.description}</h3>
          <p>
            {item.total} mentions of{" "}
            <span style={{ color: item.color }}>{item.name}</span> notes
          </p>
        </div>
      );
    });
  };

  const sliderStyle = () => {
    const sec = 2;
    const pos = position
      ? -((Math.min((position + 1) * 3, tastesReducer.length) / 3) * 100 - 100)
      : 0;
    return {
      transform: `translateX(${pos}%)`,
      transition: `${-pos % 100 ? sec / (100 / (-pos % 100)) : sec}s`,
    };
  };

  return (
    <div className="taste-fill">
      {tastesReducer.length > position * 3 + 3 ? (
        <button className="next" onClick={() => setPosition(position + 1)}>
          -
        </button>
      ) : null}
      {position ? (
        <button className="prev" onClick={() => setPosition(position - 1)}>
          -
        </button>
      ) : null}
      <div className="taste-cards">
        <div className="taste-slider" style={sliderStyle()}>
          {display()}
        </div>
      </div>
    </div>
  );
}
