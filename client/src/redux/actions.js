import { SET_HABITS, DEL_HABIT, EDIT_HIBIT, SET_IMG, SET_USER, DELETE_USER } from './action-types';

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  }
}

export function deleteUser() {
  return {
    type: DELETE_USER,
    payload: null,
  }
}

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
