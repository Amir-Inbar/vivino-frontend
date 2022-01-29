import { useState } from 'react';

export const WineReviews = (props) => {
  const { reviews } = props;
  const [reviewSection, setReviewSection] = useState(0);

  const setCurrReviewSection = (currSection) => {
    console.log(currSection);
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
  return (
    <div className="comunity-reviews">
      <h1>Community reviews</h1>
      {reviewMenu()}
    </div>
  );
};
