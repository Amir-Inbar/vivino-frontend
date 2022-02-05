import React, { useEffect, useState } from "react";
import { authService, getLoggedinUser } from "../services/auth.service";
import { reviewService } from "../services/review.service";
import { tryRequire } from "../services/util.service";
import { AddReview } from "./WineAddReview";
import { ReviewsPreview } from "./WineReviewPreview";
import { ReviewStat } from "./WineReviewStat";
import { StarRate } from "./StarRate";

export const WineReviews = ({ wineId, wine }) => {
  const [helpfulReviews, setHelpfulReviews] = useState(null);
  const [userReviews, setUserReviews] = useState(null);
  const [recentReviews, setRecentReviews] = useState(null);
  const [reviewSection, setReviewSection] = useState("Helpful");
  const [rate, setRate] = useState(null);

  const reviewsSections = {
    Helpful: helpfulReviews,
    Recent: recentReviews,
    You: userReviews,
  };

  useEffect(async () => {
    try {
      await loadUserReviews();
      await loadRecentReviews();
      await loadHelpfulReviews();
    } catch (err) {
      console.log(err);
    }
  }, [wineId]);

  const loadRecentReviews = async (index = 0) => {
    const recentParams = {
      page: { size: 4, index },
      sort: { createdAt: 0 },
    };
    const recent = await reviewService.getByWineId(wineId, recentParams);
    // setRecentReviews(
    //   recentReviews
    //     ? { ...recent, data: [...recentReviews.data, ...recent.data] }
    //     : recent
    // );
    setRecentReviews(recent);
  };

  const loadHelpfulReviews = async (index = 0) => {
    const helpfulParams = {
      page: { size: 4, index },
      sort: { likes: 0 },
    };
    const helpful = await reviewService.getByWineId(wineId, helpfulParams);
    // setHelpfulReviews(
    //   helpfulReviews
    //     ? { ...helpful, data: [...helpfulReviews.data, ...helpful.data] }
    //     : helpful
    // );
    setHelpfulReviews(helpful);
  };

  const reviewUpdate = (result) => {
    if (!result || !userReviews?.data) return;
    const reviewIdx = userReviews.data.find(
      (review) => review._id === result._id
    );
    if (reviewIdx > -1)
      setUserReviews(userReviews.data.splice(reviewIdx, 1, result));
    else setUserReviews([result, ...userReviews.data]);
    setRate(null);
  };

  const ReviewMenu = () => {
    const reviewSections = ["Helpful", "Recent", "You"];
    return (
      <div className="review-menu flex">
        {reviewSections.map((title, idx) => (
          <span
            onClick={() => setReviewSection(reviewSections[idx])}
            style={{
              color:
                reviewSection === reviewSections[idx] ? "#ba1628" : "#1e1e1e",
            }}
            key={`COMMENT_${idx}`}
          >
            {title}
          </span>
        ))}
      </div>
    );
  };

  const loadUserReviews = async () => {
    const user = authService.getLoggedinUser();
    if (!wine || !user?._id) return;
    const res = await reviewService.query({ filter: { eqWineId: wine._id } });
    setUserReviews({ data: res });
  };

  const setLike = async (reviewId) => {
    const logInUser = getLoggedinUser();
    const review = helpfulReviews.data.find(
      (review) => review._id === reviewId
    );
    if (review.likes.split(",").includes("" + logInUser._id)) {
      review.likes = review.likes
        .split(",")
        .filter((like) => like !== "" + logInUser._id)
        .join(",");
    } else {
      review.likes += logInUser._id + ",";
    }
    // setHelpfulReviews(
    //   helpfulReviews.data.map((rv) => (rv._id === review._id ? review : rv))
    // );
    setHelpfulReviews({
      ...helpfulReviews,
      data: helpfulReviews.data.map((rv) =>
        rv._id === review._id ? review : rv
      ),
    });
    await reviewService.update(review._id);
  };

  if (!reviewsSections[reviewSection]) return <div></div>;
  let reviewsToDisplay = reviewsSections[reviewSection];
  return (
    <>
      <div className="comunity-reviews flex">
        <div className="reviews-list">
          <h1>Community reviews</h1>
          <ReviewMenu />
          <ReviewsPreview reviews={reviewsToDisplay.data} setLike={setLike} />
        </div>
        <div className="review-stat flex column align-center">
          <ReviewStat wine={wine} />
          <p className="rating-feedback">
            Add your own rating and help other Vivino users pick the right wine!
          </p>
          <div className="user-rating-selection flex align-center ">
            <img
              className="user-profile"
              src={tryRequire("imgs/icons/user-profile.png")}
              alt="user-profile"
            />
            <StarRate size={30} rate={rate} isEditable={true} set={setRate} />
          </div>
          <span className="saperate"></span>
        </div>
      </div>
      <AddReview
        rate={rate}
        wine={wine}
        reviews={userReviews?.data}
        set={setRate}
        close={(review) => reviewUpdate(review)}
      />
    </>
  );
};
