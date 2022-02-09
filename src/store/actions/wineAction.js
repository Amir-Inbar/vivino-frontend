import { wineService } from '../../services/wine.service';

export function setFilterBy(filter) {
  return (dispatch) => {
    filter = Object.fromEntries(Object.entries(filter).filter(([key, val]) => val));
    dispatch({ type: 'SET_FILTER', filter });
  }
}

export function setSortBy(sort) {
  return (dispatch) => {
    sort = Object.fromEntries(Object.entries(sort).filter(([key, val]) => val !== null));
    dispatch({ type: 'SET_SORT', sort });
  }
}

export function setKeywords(keywords) {
  return (dispatch) => {
    dispatch({ type: 'SET_KEYWORDS', keywords });
  }
}

export function saveWines(wines) {
  return (dispatch) => {
    dispatch({ type: 'SET_WINES', wines });
  }
}

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
      dispatch({ type: 'SET_WINE', wine });
    } catch (err) {
      console.log(err);
    }
  };
}

