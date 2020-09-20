import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { habitReducer, iconReducer, settingsScreenReducer } from './reducers';

const store = createStore(combineReducers({
  habits: habitReducer,
  icons: iconReducer,
  settingsScreen: settingsScreenReducer
}), composeWithDevTools());

export default store;

