import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { habitReducer, imageReducer, userReducer } from './reducers';

const store = createStore(combineReducers({
  habits: habitReducer,
  user: userReducer,
}), composeWithDevTools());

export default store;

