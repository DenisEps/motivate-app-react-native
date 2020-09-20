import { SET_HABITS, DEL_HABIT, EDIT_HIBIT, SET_ICONS, SET_SETTINGSSCREEN } from './action-types';

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

export function setIcons(arr) {
  return {
    type: SET_ICONS,
    payload: arr
  }
}

export function setSettingsScreen(flag) {
  return {
    type: SET_SETTINGSSCREEN,
    payload: flag
  }
}