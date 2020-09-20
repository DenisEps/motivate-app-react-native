import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { habitReducer, settingsScreenReducer } from './reducers';

const store = createStore(combineReducers({
  habits: habitReducer,
  settingsScreen: settingsScreenReducer
}), composeWithDevTools());

export default store;

