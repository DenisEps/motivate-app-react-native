import { SET_HABITS, DEL_HABIT, EDIT_HABIT, SET_ICONS, SET_SETTINGSSCREEN } from './action-types';

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

export function iconReducer(state = [], action) {
  switch (action.type) {
    case SET_ICONS:
      return action.payload
    default:
      return state
  }
}

export default {
  habitReducer,
  iconReducer
}

export function settingsScreenReducer(state = false, action) {
  switch (action.type) {
    case SET_SETTINGSSCREEN:
      return action.payload
    default:
      return state
  }
}