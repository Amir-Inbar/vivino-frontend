import React, { useEffect, useState } from "react";
import { innerHtml } from "../services/html.service";
import { reviewService } from "../services/review.service";
import {
  debounce,
  sentenceToKababCase,
  tryRequire,
} from "../services/util.service";
import { StarRate } from "./StarRate";

export function TastePreview(props) {
  const { taste, category, setTaste, wineId } = props;
  const [keyword, setKeyword] = useState("");
  const [reviews, setReviews] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  var moment = require("moment");

  useEffect(() => {
    if (!taste) setReviews(null);
  }, [taste]);

  useEffect(async () => {
    if (!taste) return;
    setReviews(await loadReviews());
    setSearchQuery(
      category.mentions.map((mention) => mention.keyword).join("|")
    );
  }, [taste]);

  const loadReviews = async () => {
    return await reviewService.getByWineId(wineId, {
      filter: { inDescription: searchQuery },
    });
  };

  if (!taste || !reviews) return null;
  const url = tryRequire(
    `imgs/icons/taste/${sentenceToKababCase(taste.name)}.svg`
  );

  function display() {
    if (
      keyword &&
      !taste.mentions.find((mention) => mention.keyword === keyword)
    )
      setKeyword("");
    return reviews
      ? reviews.data
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
            review.description = review.description.replaceAll(
              /<[{1}^>]*>/g,
              ""
            );
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
                  <div className="reviewer">
                    <span className="name">{review.reviewer} </span>
                    <span className="reviews">({review.ratings} ratings) </span>
                    <span className="time">
                      {moment(review.createdAt).format("ll")}
                    </span>
                  </div>
                  <div className="rating">
                    <StarRate rate={review.rate} />
                  </div>
                </div>
              </div>
            );
          })
      : null;
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

  const scrollDown = async (ev) => {
    debounce(
      async () => {
        if (reviews.page.index < reviews.page.total - 1) {
          const { scrollTop, scrollHeight, clientHeight } = ev.target;
          if (scrollHeight - clientHeight - scrollTop < clientHeight * 0.1) {
            const res = await reviewService.getByWineId(wineId, {
              filter: { inDescription: searchQuery },
              page: { index: reviews.page.index + 1 },
            });
            if (res)
              setReviews({ ...res, data: [...reviews.data, ...res.data] });
          }
        }
      },
      "TASTE-SCROLL",
      1000
    );
  };

  return taste ? (
    <section className="taste-preview" onClick={() => setTaste(null)}>
      <div className="taste-content" onClick={(e) => e.stopPropagation()}>
        <section
          className="taste-header"
          style={{ backgroundColor: taste.color }}
        >
          <button onClick={() => setTaste(null)}>X</button>
          <img src={url} alt={taste.name} />
          <h2>{taste.name}</h2>
        </section>
        <section className="taste-keywords">{keywords()}</section>
        <section className="taste-reviews" onScroll={scrollDown}>
          {display()}
        </section>
      </div>
    </section>
  ) : null;
}
