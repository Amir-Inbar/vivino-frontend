import { reviewService } from '../../services/review.service';

export function loadReviews() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().review.Module;
    try {
      const reviews = await reviewService.query(filterBy);
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
      dispatch({ type: 'SET_REVIEWS', reviews });
    } catch (err) {
      console.log(err);
    }
  };
}
