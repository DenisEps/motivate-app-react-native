import { SET_HABITS, DEL_HABIT, EDIT_HABIT, SET_SETTINGSSCREEN } from './action-types';

export function habitReducer(state = [], action) {
  switch (action.type) {
    case SET_HABITS:
      return action.payload
    case EDIT_HABIT:
      return {
        ...state, title: (state.map((habit) => {
          if (habit.id === action.payload.id) {
            return { ...habit, title: action.payload.title }
          }
        }))
      }
    case DEL_HABIT:
      return (state.filter(({ id }) => id !== action.payload))
    default:
      return state
  }
}

export default {
  habitReducer,
}

export function settingsScreenReducer(state = true, action) {
  switch (action.type) {
    case SET_SETTINGSSCREEN:
      return action.payload
    default:
      return state
  }
}