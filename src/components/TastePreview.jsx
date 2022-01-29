import React, { useEffect, useState } from "react";
import { innerHtml } from "../services/html.service";
import { sentenceToKababCase } from "../services/util.service";
import { StarRate } from "./StarRate";

export function TastePreview(props) {
  const { taste, setTaste } = props;
  const [keyword, setKeyword] = useState("");
  if (!taste) return null;
  const { category, reviews } = taste;
  console.log(category, reviews);

  const url = require(`../assets/imgs/icons/taste/${sentenceToKababCase(
    category.name
  )}.svg`);

  function display() {
    if (
      keyword &&
      !category.mentions.find((mention) => mention.keyword === keyword)
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
        const keywords = category.mentions.map((mention) =>
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
              `<span style="color:${category.color};font-weight:700;">${keyword}</span>`
            ))
        );
        return (
          <div className="taste-review" key={"REVIEW_" + idx}>
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: desc }}></div>
            </div>
            <div className="summerize">
              <div className="reviewer">{review.reviewer}</div>
              <div className="rating">
                <StarRate rate={review.rate} />
              </div>
            </div>
          </div>
        );
      });
  }

  const keywords = () =>
    category.mentions.map((mention, idx) => {
      const buttonStyle = () =>
        keyword === mention.keyword
          ? {
              backgroundColor: "#fff",
              color: category.color,
              borderColor: category.color,
            }
          : { backgroundColor: category.color };
      const countStyle = () => {
        return keyword === mention.keyword
          ? { backgroundColor: category.color, color: "#fff" }
          : {
              backgroundColor: "#fff",
              color: category.color,
              borderColor: category.color,
            };
      };
      return (
        <button
          key={"KEYWORD_" + idx}
          style={buttonStyle()}
          onClick={() =>
            setKeyword(keyword === mention.keyword ? "" : mention.keyword)
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
    <section className="taste-preview" onClick={() => setTaste(null)}>
      <div className="taste-content" onClick={(e) => e.stopPropagation()}>
        <section
          className="taste-header"
          style={{ backgroundColor: category.color }}
        >
          <button onClick={() => setTaste(null)}>X</button>
          <img src={url} alt={category.name} />
          <h2>{category.name}</h2>
        </section>
        <section className="taste-keywords">{keywords()}</section>
        <section className="taste-reviews">{display()}</section>
      </div>
    </section>
  ) : null;
}
