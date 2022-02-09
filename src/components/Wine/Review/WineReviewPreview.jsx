import { useState } from "react";
import { makeId, tryRequire } from "../../../services/util.service";

export const ReviewsPreview = ({ reviews, setLike }) => {
  var moment = require("moment");
  const [activeReview, setActiveReview] = useState(null);
  if (!reviews?.length) return <div>No reviews found</div>;
  const UserInfo = ({ review }) => {
    const btnNames = ["like", "comment"];
    return (
      <div className="bottom-card flex space-between">
        <div className="user-info flex align-center">
          <img
            src={
              review.picture
                ? review.picture
                : tryRequire("imgs/icons/user-profile.png")
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
                  ? setLike(review)
                  : setActiveReview(activeReview === review ? null : review)
              }
              key={"REPLY_" + makeId()}
            >
              <img src={tryRequire(`imgs/icons/${el}.svg`)} alt="" />
              <span>{!idx ? review.likes : review.replies}</span>
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
            activeReview.picture || tryRequire("imgs/icons/user-profile.png")
          }
          onError={({ target }) =>
            (target.src = tryRequire("imgs/icons/user-profile.png"))
          }
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
          <div className="review-card hover-box">
            <div className="user-rating flex align-center">
              <img src={tryRequire("imgs/icons/single-star.svg")} alt="star" />

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
