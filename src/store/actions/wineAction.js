import { wineService } from '../../services/wine.service';

export function loadWines() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().wineModule;
    try {
      const wines = await wineService.query(filterBy);
      dispatch({ type: 'SET_WINES', wines });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadWine(id) {
  return async (dispatch) => {
    try {
      const wine = await wineService.getById(id);
      console.log(wine);
      dispatch({ type: 'SET_WINE', wine });
    } catch (err) {
      console.log(err);
    }
  };
}

