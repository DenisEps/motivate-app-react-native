import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { habitReducer, imageReducer, userReducer } from './reducers';

const store = createStore(combineReducers({
  habits: habitReducer,
  image: imageReducer,
  user: userReducer,
}), composeWithDevTools());

export default store;
