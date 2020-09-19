import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { habitReducer } from './reducers';

const store = createStore(combineReducers({
  habits: habitReducer
}), composeWithDevTools());

export default store;