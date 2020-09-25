import {Audio} from 'expo-av';

export const playSound = async () => {
  try {
    await Audio.setIsEnabledAsync(true);
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(require("./audio/click.mp3"));
    await soundObject.playAsync();
  } catch (err) {
    console.log(err);
  }
};
export const donatDone = async () => {
  try {
    await Audio.setIsEnabledAsync(true);
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(require("./audio/donatDone1.wav"));
    await soundObject.playAsync();
  } catch (err) {
    console.log(err);
  }
};

export const deleteHabitAudio = async () => {
  try {
    await Audio.setIsEnabledAsync(true);
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(require("./audio/delete.mp3"));
    await soundObject.playAsync();
  } catch (err) {
    console.log(err);
  }
};

export const details = async () => {
  try {
    await Audio.setIsEnabledAsync(true);
    const soundObject = new Audio.Sound();
    await soundObject.loadAsync(require("./audio/details.mp3"));
    await soundObject.playAsync();
  } catch (err) {
    console.log(err);
  }
};

