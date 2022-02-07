import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reviewReducer } from './reducers/reviewReducer';
import { userReducer } from './reducers/userReducer';
import { wineReducer } from './reducers/wineReducer';
import { wineryReducer } from './reducers/wineryReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  userModule: userReducer,
  wineModule: wineReducer,
  wineryModule: wineryReducer,
  reviewModule: reviewReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
window.myStore = store;
