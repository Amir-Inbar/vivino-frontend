import React, { useEffect, useState } from "react";
import { sentenceToKababCase } from "../services/util.service";

export function TasteFill(props) {
  const { tastes, reviews } = props;
  const [position, setPosition] = useState(0);
  const [slidePos, setSlidePos] = useState(0);

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
              `(${keyword}|${keyword.replace(" ", "")})`,
              "gi"
            );
            const found = review.description.match(re) || [];
            total += found.length;
            sum += found.length;
            return sum;
          }, 0);
          return { keyword, count };
        })
        .filter((mention) => !!mention.count);
      let description = mentions
        .map((taste) => taste.keyword)
        .slice(0, 3)
        .join(", ");
      description =
        description.charAt(0).toUpperCase() + description.slice(1) + " ...";
      return { ...taste, description, mentions, total, url };
    })
    .filter((taste) => !!taste.mentions.length)
    .sort((a, b) => b.total - a.total);

  useEffect(() => {
    display();
  }, [position]);

  const display = () => {
    return tastesReducer.map((item, idx) => {
      return (
        <div className="taste-fill-preview" key={"TASTE_FILL_" + idx}>
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

  const slidePosition = () => {
    return position
      ? -((Math.min((position + 1) * 3, tastesReducer.length) / 3) * 100 - 100)
      : 0;
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
        <div
          className="taste-slider"
          style={{ transform: `translateX(${slidePosition()}%)` }}
        >
          {display()}
        </div>
      </div>
    </div>
  );
}
