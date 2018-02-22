import React from 'react'
import {AsyncStorage} from 'react-native'
import {Notifications, Permissions} from 'expo'


export const DECK_STORAGE_KEY = 'FlashCards:decks';
const NOTIFICATION_KEY = 'FlashCards:notifications';


export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification() {
    return {
        title: 'Mobile flashcards',
        body: "Time to tale a quiz!",
        ios: {
            sound: true,
        },
        android: {
            priority: 'high',
            sticky: false,
            vibrate: true,
            sound: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            let notificationDate = new Date();
                            notificationDate.setDate(notificationDate.getDate() + 1);
                            notificationDate.setHours(19);
                            notificationDate.setMinutes(0);
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: notificationDate,
                                    repeat: 'day',
                                }
                            );
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}