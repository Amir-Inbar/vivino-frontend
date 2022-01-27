import { wineryService } from '../../services/winery.service';

export function loadWineries() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().wineryModule;
    try {
      const wineries = await wineryService.query(filterBy);
      dispatch({ type: 'SET_WINERIES', wineries });
    } catch (err) {
      console.log(err);
    }
  };
}

export function loadWinery(id) {
  return async (dispatch) => {
    try {
      const winery = await wineryService.getById(id);
      dispatch({ type: 'SET_WINERY', winery });
    } catch (err) {
      console.log(err);
    }
  };
}