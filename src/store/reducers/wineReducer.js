const INITIAL_STATE = {
  wines: null,
  page: null,
  wine: null,
  total: null,
  filter: null,
};

export function wineReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_WINES':
      return {
        ...state,
        wines: [...action.wines?.data],
        page: { ...action.wines?.page },
        total: action.wines.total,
      };
    case 'SET_WINE': {
      return {
        ...state,
        wine: action.wine,
      }
    }
    case 'SET_FILTER': {
      console.log(action);
      return {
        ...state,
        filter: action.filter,
      }
    }
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
