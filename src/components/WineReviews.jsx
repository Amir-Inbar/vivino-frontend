import { useState } from 'react';

export const WineReviews = (props) => {
  const { reviews } = props;
  var moment = require('moment');
  const [reviewSection, setReviewSection] = useState(0);

  const setCurrReviewSection = (currSection) => {
    setReviewSection(currSection);
  };

  const reviewMenu = () => {
    const reviewSections = ['Helpful', 'Recent', 'Friends', 'You'];
    return (
      <div className="review-menu flex">
        {reviewSections.map((title, idx) => (
          <span
            onClick={() => setCurrReviewSection(idx)}
            style={{ color: reviewSection === idx ? '#ba1628' : '#1e1e1e' }}
            key={`c-${idx}`}
          >
            {title}
          </span>
        ))}
      </div>
    );
  };

  const setLike = () => {
    console.log('das');
  };
  const setComment = () => {
    console.log('das');
  };
  const userInfo = (review) => {
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
          <a href="google.com">{review.reviewer} (180 ratings)</a>
          <span className="date"> {moment(review.createdAt).format('ll')}</span>
        </div>
        <div className="review-comments flex">
          {btnNames.map((el, idx) => (
            <div
              className="reviews-btn flex align-center"
              onClick={() => (!idx ? setLike() : setComment())}
            >
              <img src={require(`../assets/imgs/icons/${el}.svg`)} alt="" />
              <span>{review.userId}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const reviewsPreview = (reviews) => {
    return (
      <div>
        {reviews.map((el, idx) => (
          <div className="review-card-main" key={el._id}>
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
            <div className="review-user">{userInfo(el)}</div>
          </div>
        ))}
      </div>
    );
  };
  if (!reviews) return <div></div>;
  return (
    <div className="comunity-reviews">
      <h1>Community reviews</h1>
      {reviewMenu()}
      <div>{reviewsPreview(reviews)}</div>
    </div>
  );
};
