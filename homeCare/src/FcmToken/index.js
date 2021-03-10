import React from 'react';

import {messaging, notifications} from 'react-native-firebase';

export async function getToken() {
  const fcmToken = await messaging().getToken();
  console.log('fcmToken', fcmToken);

  return fcmToken;
}
async function checkPermission() {
  const enabled = await messaging().hasPermission();
  if (enabled) {
    getToken();
  } else {
    requestPermission();
  }
}
async function requestPermission() {
  try {
    await messaging().requestPermission();
    getToken();
  } catch (error) {
    console.log('error', error);
  }
}
async function createNotificationListener() {
  notifications().onNotification((notification) => {
    notification.android.setChannelId('insider').setSound('default');
    notifications().displayNotification(notification);
  });
}

export function fcmTokenInitial() {
  const channel = new notifications.Android.Channel(
    'inside',
    'insider channel',
    notifications.Android.Importance.Max,
  );
  notifications().android.createChannel(channel);
  checkPermission();
  createNotificationListener();
}
