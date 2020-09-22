import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { habitReducer, imageReducer, loaderReducer, userReducer } from './reducers';

const store = createStore(combineReducers({
  habits: habitReducer,
  user: userReducer,
  loader: loaderReducer,
}), composeWithDevTools());

export default store;

