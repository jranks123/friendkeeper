import { calculateDaysOverdue } from "./date";
import { Notifications } from "expo";
import { Item } from "../store/items/types";
import { LocalNotification } from "expo/build/Notifications/Notifications.types";

const localNotification: (Item) => LocalNotification =
    (item: Item) =>  ({
      title: 'Don\'t forget about ' + item.name + '!',
      body: 'You haven\'t seen ' + item.name + ' in ' + item.maximumDaysBetweenActions.toString() + ' days! Give \'em a ring!'});


export const setNotification = (item: Item): Promise<string> => {
  const daysTilShow = Math.abs(calculateDaysOverdue(item.dateOfLastAction, item.maximumDaysBetweenActions));
  const time = new Date(new Date().getTime() + (daysTilShow * 60 * 60 * 24 * 1000));
  const schedulingOptions = { time };

  return Notifications.scheduleLocalNotificationAsync(
      localNotification(item),
      schedulingOptions,
  ).then(id => {
    return id.toString()
  });
};

const cancelNotification = (id: string | null): Promise<void> => {
  return id ? Notifications.cancelScheduledNotificationAsync(id) : Promise.resolve()
};

export const setUpNotification = (item: Item): Promise<string> => {
  return cancelNotification(item.currentNotificationId).then(_ => {
    return setNotification(item);
  }).catch(err => {
    console.log(err + ". The notiication has probably already been shown.");
    return setNotification(item);
  });
};