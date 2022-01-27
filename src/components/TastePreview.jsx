import React, { useState } from "react";
import { innerHtml } from "../services/html.service";
import { sentenceToKababCase } from "../services/util.service";
import { StarRate } from "./StarRate";

export function TastePreview(props) {
  const { taste, setTaste } = props;
  const [keyword, setKeyword] = useState("");
  if (!taste) return null;
  const url = require(`../assets/imgs/icons/taste/${sentenceToKababCase(
    taste.name
  )}.svg`);
  const reviews = [];

  function display() {
    if (
      keyword &&
      !taste.mentions.find((mention) => mention.keyword === keyword)
    )
      setKeyword("");
    return reviews
      .filter((review) => {
        const re = new RegExp(
          `\\b(${keyword}|${keyword.replace(" ", "")})\\b`,
          "gi"
        );
        return re.exec(review.description);
      })
      .map((review, idx) => {
        const keywords = taste.mentions.map((mention) =>
          mention.keyword !== mention.keyword.replace(" ", "")
            ? `${mention.keyword}|${mention.keyword.replace(" ", "")}`
            : mention.keyword
        );
        const re = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
        const match = review.description.match(re) || [];
        review.description = review.description.replaceAll(/<[{1}^>]*>/g, "");
        let desc = innerHtml(review.description);
        match.forEach(
          (keyword) =>
            (desc = desc.replace(
              keyword,
              `<span style="color:${taste.color};font-weight:700;">${keyword}</span>`
            ))
        );
        return (
          <div className="taste-review" key={"REVIEW_" + idx}>
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: desc }}></div>
            </div>
            <div className="summerize">
              <div class="reviewer">{review.reviewer}</div>
              <div class="rating">
                <StarRate rate={review.rate} />
              </div>
            </div>
          </div>
        );
      });
  }

  const keywords = () =>
    taste.mentions.map((mention, idx) => {
      const buttonStyle = () =>
        keyword === mention.keyword
          ? {
              backgroundColor: "#fff",
              color: taste.color,
              borderColor: taste.color,
            }
          : { backgroundColor: taste.color };
      const countStyle = () => {
        return keyword === mention.keyword
          ? { backgroundColor: taste.color, color: "#fff" }
          : {
              backgroundColor: "#fff",
              color: taste.color,
              borderColor: taste.color,
            };
      };
      return (
        <button
          key={"KEYWORD_" + idx}
          style={buttonStyle()}
          onClick={
            keyword === mention.keyword
              ? () => setKeyword("")
              : () => setKeyword(mention.keyword)
          }
        >
          <div className="count" style={countStyle()}>
            {mention.count}
          </div>
          <div className="title">{mention.keyword}</div>
        </button>
      );
    });

  return taste ? (
    <div className="taste-preview" onClick={() => setTaste(null)}>
      <div className="taste-content" onClick={(e) => e.stopPropagation()}>
        <section
          className="taste-header"
          style={{ backgroundColor: taste.color }}
        >
          <button onClick={() => setTaste(null)}>X</button>
          <img src={url} />
          <h2>{taste.name}</h2>
        </section>
        <section className="taste-keywords">{keywords()}</section>
        <section className="taste-reviews">{display()}</section>
      </div>
    </div>
  ) : null;
}
