import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reviewReducer } from './reducers/reviewReducer';
import { wineReducer } from './reducers/wineReducer';
import { wineryReducer } from './reducers/wineryReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  wineModule: wineReducer,
  wineryModule: wineryReducer,
  reviewModule: reviewReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
window.myStore = store;
