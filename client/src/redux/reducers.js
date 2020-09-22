
import { SET_HABITS, DEL_HABIT, EDIT_HABIT, SET_IMG, SET_USER, DELETE_USER, USER_AUTH } from './action-types';

// import {
//   SET_HABITS,
//   DEL_HABIT,
//   EDIT_HABIT,
//   SET_IMG,
//   SET_USER,
//   DELETE_USER,
//   USER_AUTH,
// } from './action-types';


export function habitReducer(state = [], action) {
  switch (action.type) {
    case SET_HABITS:
      return action.payload;
    case EDIT_HABIT:
      return {
        ...state,
        title: state.map((habit) => {
          if (habit.id === action.payload.id) {
            return { ...habit, title: action.payload.title };
          }
        }),
      };
    case DEL_HABIT:
      return state.filter(({ id }) => id !== action.payload);
    default:
      return state;
  }
}

export function userReducer(state = null, action) {
  console.log('user reducer >>>>>>>>>>>>>>>', action);
  switch (action.type) {
    case SET_USER:
      return action.payload;

    case DELETE_USER:
      return action.payload;

    case USER_AUTH:
      return action.payload;

    default:
      return state;
  }
}

export default {
  habitReducer,
}
