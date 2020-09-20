import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { habitReducer, imageReducer } from './reducers';

const store = createStore(combineReducers({
  habits: habitReducer,
  image: imageReducer,
}), composeWithDevTools());

export default store;