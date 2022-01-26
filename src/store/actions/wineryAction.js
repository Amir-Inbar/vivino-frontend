import { wineryService } from '../../services/winery.service';

export function loadWineries() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().wineModule;
    try {
      const wineries = await wineryService.query(filterBy);
      dispatch({ type: 'SET_WINERIES', wineries });
    } catch (err) {
      console.log(err);
    }
  };
}
