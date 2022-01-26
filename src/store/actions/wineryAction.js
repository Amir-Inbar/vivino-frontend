import { wineService } from '../../services/wine.service';

export function loadWines() {
  return async (dispatch, getState) => {
    console.log('amir');
    const { filterBy } = getState().wineModule;
    try {
      const wines = await wineService.query(filterBy);
      dispatch({ type: 'SET_WINES', wines });
    } catch (err) {
      console.log(err);
    }
  };
}
