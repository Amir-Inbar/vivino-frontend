const INITIAL_STATE = {
  winery: null,
};

export function wineryReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_WINERY':
      return {
        ...state,
        winery: [...action.wines.data],
        page: { ...action.wines.page },
        total: action.wines.total,
      };
    case 'ADD_WINE':
      return {
        ...state,
        wines: [...state.wines, action.wine],
      };
    case 'REMOVE_WINE':
      return {
        ...state,
        wines: state.wines.filter((wine) => wine._id !== action.wineId),
      };
    case 'UPDATE_WINE':
      return {
        ...state,
        wines: state.wines.map((wine) =>
          wine._id === action.wine._id ? action.wine : wine
        ),
      };
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: { ...action.filterBy },
      };
    default:
      return state;
  }
}
