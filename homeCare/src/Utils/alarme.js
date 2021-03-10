import React from 'react';
import {Vibration, Alert} from 'react-native';
import Sound from 'react-native-sound';

const music = require('../assets/alerta.mp3');

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

var sound = new Sound(music);
var active;
var controleSoundAlarme = 0;

export function alarme(title, status, relatar, relatarLabel, setIsAlarme) {
  function moduleAlerme() {
    Alert.alert(
      `${title}`,
      `Clasificação de risco: ${status}`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            setIsAlarme(false), StopSound();
          },
          style: 'cancel',
        },
        {
          text: `${relatarLabel}`,
          onPress: () => {
            setIsAlarme(false), relatar(), StopSound();
          },
        },
      ],
      {cancelable: false},
    );
  }
  if (status === 'Severa') {
    moduleAlerme();
    playSound();
  } /* else if (status === 'Moderada') {
    moduleAlerme();
  } */
}

function playSound() {
  if (controleSoundAlarme === 0) {
    Vibration.vibrate(PATTERN, true);
    /* active = setInterval(() => {
      sound.reset();
      sound.setVolume(1).play();
    }, 100); */
    sound.setVolume(1).play();
    sound.setNumberOfLoops(-1);
    controleSoundAlarme++;
  }
}
export function StopSound() {
  /// para liberar o proximo alarme 30s
  console.log('Alerme Stop');
  /* setTimeout(() => {
    controleSoundAlarme = 0;
  }, 1000); */
  controleSoundAlarme = 0;
  Vibration.cancel();
  sound.pause();
  /* sound.stop(() => {
    sound.play();
  }); */
  clearInterval(active);
}
