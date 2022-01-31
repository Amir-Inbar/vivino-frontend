import { reviewService } from '../../services/review.service';

export function loadReviews(queries) {
  return async (dispatch) => {
    try {
      const reviews = await reviewService.query(queries);
      if (reviews)
        dispatch({ type: 'SET_REVIEWS', reviews });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadReview(id, queries) {
  return async (dispatch) => {
    try {
      const reviews = await reviewService.getByWineId(id, queries);
      if (reviews)
        dispatch({ type: 'SET_REVIEWS', reviews });
    } catch (err) {
      console.log(err);
    }
  };
}
