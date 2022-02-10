import React, { useEffect, useState } from "react";
import { authService, getLoggedinUser } from "../../../services/auth.service";
import { reviewService } from "../../../services/review.service";
import { tryRequire } from "../../../services/util.service";
import { AddReview } from "./WineAddReview";
import { ReviewsPreview } from "./WineReviewPreview";
import { ReviewStat } from "./WineReviewStat";
import { StarRate } from "../../StarRate";
import { useSelector } from "react-redux";

export const WineReviews = ({ wineId, wine }) => {
  const user = useSelector((state) => state.userModule.user);
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
    await loadRecentReviews();
    await loadHelpfulReviews();
  }, [wineId]);

  useEffect(() => {
    (async () => {
      if (user) {
        await loadUserReviews();
        await loadRecentReviews();
        await loadHelpfulReviews();
      } else {
        setUserReviews(null);
      }
    })();
  }, [user]);

  const loadRecentReviews = async (index = 0) => {
    const recentParams = {
      page: { size: 4, index },
      sort: { createdAt: 0 },
    };
    try {
      const recent = await reviewService.getByWineId(wineId, recentParams);
      setRecentReviews(
        index
          ? { ...recent, data: [...recentReviews.data, ...recent.data] }
          : recent
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadHelpfulReviews = async (index = 0) => {
    const helpfulParams = {
      page: { size: 4, index },
      sort: { likes: 0 },
    };
    try {
      const helpful = await reviewService.getByWineId(wineId, helpfulParams);
      setHelpfulReviews(
        index
          ? { ...helpful, data: [...helpfulReviews.data, ...helpful.data] }
          : helpful
      );
    } catch (err) {
      console.log(err);
    }
  };

  const loadUserReviews = async () => {
    if (!wine || !user?._id) return;
    try {
      const res = await reviewService.query({ filter: { eqWineId: wine._id } });
      setUserReviews({ data: res });
    } catch (err) {}
  };

  const reviewUpdate = (result) => {
    setRate(null);
    if (!result || !userReviews?.data) return;
    const reviewIdx = userReviews.data.find(
      (review) => review._id === result._id
    );
    if (reviewIdx > -1)
      setUserReviews(userReviews.data.splice(reviewIdx, 1, result));
    else setUserReviews([result, ...userReviews.data]);
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

  const setLike = async (review) => {
    if (!user) return;
    try {
      const res = await reviewService.update(review._id, {
        like: review.ilike ? false : true,
      });
      if (res) {
        const updateStates = (state, fn, id) => {
          fn({
            ...state,
            data: [
              ...state.data.map((rev) => {
                if (rev._id !== id) return rev;
                return {
                  ...rev,
                  ilike: rev.ilike ? 0 : 1,
                  likes: !rev.ilike ? rev.likes + 1 : rev.likes - 1,
                };
              }),
            ],
          });
        };
        updateStates(helpfulReviews, setHelpfulReviews, review._id);
        updateStates(recentReviews, setRecentReviews, review._id);
        updateStates(userReviews, setUserReviews, review._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let reviewsToDisplay = reviewsSections[reviewSection];
  return (
    <>
      <div className="comunity-reviews flex">
        <div className="reviews-list">
          <h1>Community reviews</h1>
          <ReviewMenu />
          <ReviewsPreview reviews={reviewsToDisplay?.data} setLike={setLike} />
        </div>
        <div className="review-stat flex column align-center">
          <ReviewStat wine={wine} />
          <p className="rating-feedback">
            Add your own rating and help other users pick the right wine!
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
