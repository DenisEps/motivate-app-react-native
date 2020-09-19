import { SET_HABITS, DEL_HABIT, EDIT_HIBIT, SET_IMG } from './action-types';

export function setHabits(habits) {
  return {
    type: SET_HABITS,
    payload: habits
  }
}

export function delHabit(id) {
  return {
    type: DEL_HABIT,
    payload: id
  }
}

export function editHabit(id, title) {
  return {
    type: EDIT_HIBIT,
    payload: {
      id,
      title
    }
  }
}

export function setImg(path) {
  return {
    type: SET_IMG,
    payload: path
  }
}