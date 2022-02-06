import { useState } from "react";
import { makeId, tryRequire } from "../services/util.service";
export const ReviewsPreview = ({ reviews, setLike }) => {
  var moment = require("moment");
  const [activeReview, setActiveReview] = useState(null);
  if (!reviews) return null;
  const UserInfo = ({ review }) => {
    const btnNames = ["like", "comment"];
    return (
      <div className="bottom-card flex space-between">
        <div className="user-info flex align-center">
          <img
            src={
              review.picture
                ? review.picture
                : require("../assets/imgs/icons/user-profile.png")
            }
            alt=""
          />
          <a href="google.com">
            {review.reviewer} (ratings {review.ratings})
          </a>
          <span className="date"> {moment(review.createdAt).format("ll")}</span>
        </div>
        <div className="review-comments flex">
          {btnNames.map((el, idx) => (
            <div
              className="reviews-btn flex align-center"
              onClick={() =>
                !idx
                  ? setLike(review._id)
                  : setActiveReview(activeReview === review ? null : review)
              }
              key={"REPLY_" + makeId()}
            >
              <img src={require(`../assets/imgs/icons/${el}.svg`)} alt="" />
              <span>
                {!idx
                  ? review.likes?.split(",").filter((like) => like).length
                  : review.replies?.split(",").filter((like) => like).length}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OnReply = ({ review }) => {
    if (activeReview !== review) return null;
    return (
      <div className="user-reply flex align-center space-between">
        <img
          src={
            activeReview.picture
              ? activeReview.picture
              : tryRequire("imgs/icons/user-profile.png")
          }
          alt=""
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Leave a comment"
        ></textarea>
      </div>
    );
  };

  if (!reviews) return null;
  return (
    <>
      {reviews.map((el, idx) => (
        <div className="review-card-main" key={"REVIEW_" + idx}>
          <div className="review-card">
            <div
              className="user-rating flex align-center"
              style={{ backgroundColor: "#f9f7d6", color: "#a26f01" }}
            >
              <img
                src={require("../assets/imgs/icons/single-star.svg").default}
                alt="star"
              />

              <span className="review-rate-title">{el.rate}</span>
            </div>
            <span className="review-desc">{el.description}</span>
          </div>
          <div className="review-user">
            <UserInfo review={el} />
          </div>
          <OnReply review={el} />
        </div>
      ))}
    </>
  );
};
