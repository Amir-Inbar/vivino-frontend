import React, { useEffect, useState } from 'react';
import { authService, getLoggedinUser } from '../services/auth.service';
import { reviewService } from '../services/review.service';
import { makeId, tryRequire } from '../services/util.service';
import { loadReview } from '../store/actions/reviewAction';
import { AddReview } from './AddReview';
import { ReviewStat } from './ReviewStat';
import { StarRate } from './StarRate';

export const WineReviews = ({ wineId, wine }) => {
  var moment = require('moment');
  const [reviews, setReviews] = useState([]);
  const [reviewSection, setReviewSection] = useState(0);
  const [activeReview, setActiveReview] = useState(null);
  const [rate, setRate] = useState(null);
  const [userReviews, setUserReviews] = useState([]);

  const logInUser = getLoggedinUser();
  const setCurrReviewSection = (currSection) => {
    setReviewSection(currSection);
  };

  useEffect(async () => {
    const res = await reviewService.getByWineId(wineId, {
      page: { size: 4 },
    });
    const { data } = res;
    setReviews(data);
    await loadUserReviews();

  }, [wineId]);

  const reviewUpdate = (result) => {
    if (!result || !userReviews) return;
    const reviewIdx = userReviews.find((review) => review._id === result._id);
    if (reviewIdx > -1) setUserReviews(userReviews.splice(reviewIdx, 1, result));
    else setUserReviews([result, ...userReviews]);
  };

  const ReviewMenu = () => {
    const reviewSections = ['Helpful', 'Recent', 'Friends', 'You'];
    return (
      <div className="review-menu flex">
        {reviewSections.map((title, idx) => (
          <span
            onClick={() => setCurrReviewSection(idx)}
            style={{ color: reviewSection === idx ? '#ba1628' : '#1e1e1e' }}
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
    setUserReviews(res.data ? [] : res || []);
  };

  const setLike = (reviewId) => {
    const review = reviews.find((review) => review._id === reviewId);
    console.log(review.likes.split(','));
    if (review.likes.split(',').includes('' + logInUser._id)) {
      review.likes = review.likes
        .split(',')
        .filter((like) => like !== '' + logInUser._id)
        .join(',');
    } else {
      review.likes += ',' + logInUser._id;
    }
    setReviews(reviews.map((rv) => (rv._id === review._id ? review : rv)));
    reviewService.update(review._id);
  };

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  const OnReply = ({ review }) => {
    if (activeReview !== review) return null;
    return (
      <div className="user-reply flex align-center space-between">
        <img
          src={
            activeReview.picture
              ? activeReview.picture
              : tryRequire('imgs/icons/user-profile.png')
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
  const UserInfo = ({ review }) => {
    const btnNames = ['like', 'comment'];
    return (
      <div className="bottom-card flex space-between">
        <div className="user-info flex align-center">
          <img
            src={
              review.picture
                ? review.picture
                : require('../assets/imgs/icons/user-profile.png')
            }
            alt=""
          />
          <a href="google.com">
            {review.reviewer} (ratings {review.ratings})
          </a>
          <span className="date"> {moment(review.createdAt).format('ll')}</span>
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
              key={'REPLY_' + makeId()}
            >
              <img src={require(`../assets/imgs/icons/${el}.svg`)} alt="" />
              <span>
                {!idx
                  ? review.likes?.split(',').filter((like) => like).length
                  : review.replies?.split(',').filter((like) => like).length}
                {console.log(
                  review.likes?.split(',').filter((like) => like).length
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const ReviewsPreview = ({ reviews }) => {
    if (!reviews) return null;
    return (
      <div>
        {reviews.map((el, idx) => (
          <div className="review-card-main" key={'REVIEW_' + idx}>
            <div className="review-card">
              <div
                className="user-rating flex align-center"
                style={{ backgroundColor: '#f9f7d6', color: '#a26f01' }}
              >
                <img
                  src={require('../assets/imgs/icons/single-star.svg').default}
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
      </div>
    );
  };
  if (!reviews) return <div></div>;
  return (
    <>
      <div className="comunity-reviews flex">
        <div className="reviews-list">
          <h1>Community reviews</h1>
          <ReviewMenu />
          <ReviewsPreview reviews={reviews} />
        </div>
        <div className="review-stat">
          <ReviewStat wine={wine} />
          <StarRate size={24} rate={rate} isEditable={true} set={setRate} />
        </div>
      </div>
      <AddReview
        rate={rate}
        wine={wine}
        reviews={userReviews}
        set={setRate}
        close={(review) => reviewUpdate(review)}
      />
    </>
  );
};
