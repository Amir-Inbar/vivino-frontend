import { useState } from 'react';

export const WineReviews = (props) => {
  const { reviews } = props;
  const [reviewSection, setReviewSection] = useState(0);

  const setCurrReviewSection = (currSection) => {
    setReviewSection(currSection);
  };
  console.log(reviews);
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

  const reviewsPreview = (reviews) => {
    return (
      <div>
        {reviews.map((el, idx) => (
          <div className="review-card ">
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
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="comunity-reviews">
      <h1>Community reviews</h1>
      {reviewMenu()}

      <div className="reviews-section">{reviewsPreview(reviews)}</div>
    </div>
  );
};
