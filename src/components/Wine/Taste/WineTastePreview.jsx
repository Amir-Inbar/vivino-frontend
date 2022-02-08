import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { reviewService } from "../../../services/review.service";
import {
  debounce,
  sentenceToKababCase,
  tryRequire,
} from "../../../services/util.service";
import { StarRate } from "../../StarRate";

export function TastePreview(props) {
  const { wine, query } = props;
  const [taste, setTaste] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [reviews, setReviews] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  var moment = require("moment");
  const location = useLocation();
  const history = useHistory();

  const setQuery = (name, value) => {
    const queryParams = new URLSearchParams(location.search);
    if (value) queryParams.set(name, value);
    else queryParams.delete(name);
    history.replace({ search: queryParams.toString() });
  };

  useEffect(async () => {
    if (!query) {
      setTaste(null);
      setReviews(null);
      return;
    }
    setTaste(wine.tastes.find((taste) => taste.name === query));
  }, [query]);

  useEffect(
    async () =>
      setSearchQuery(
        taste
          ? taste.mentions.map((mention) => mention.keyword).join("|")
          : null
      ),
    [taste]
  );

  useEffect(async () => {
    if (searchQuery)
      setReviews(
        await reviewService.getByWineId(wine._id, {
          filter: { inDescription: searchQuery },
        })
      );
  }, [searchQuery]);

  if (!query || !reviews || !taste) return null;
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
            let desc = review.description;
            match.forEach(
              (keyword) =>
                (desc = desc.replace(
                  keyword,
                  `<span style="color:${taste.color};font-weight:700;">${keyword}</span>`
                ))
            );
            return (
              <div className="taste-review" key={"REVIEW_" + idx}>
                <div className="content hover-box">
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
            const res = await reviewService.getByWineId(wine._id, {
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
    <section className="taste-preview" onClick={() => setQuery("taste")}>
      <div className="taste-content" onClick={(e) => e.stopPropagation()}>
        <section
          className="taste-header"
          style={{ backgroundColor: taste.color }}
        >
          <button onClick={() => setQuery("taste")}>X</button>
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
