import {writable, type Writable} from "svelte/store";

export type NotificationData = {
  message: string;
  type: "success" | "error" | "info" | "warning";
  id: string;
};

export const notification: Writable<NotificationData[]> = writable([]);

export const dismissNotification = (id: string) => {
  notification.update((notifications) => notifications.filter((val) => val.id !== id));
}
export const dismissNotificationIn = async (id: string, ms: number) => {
  setTimeout(() => {
    dismissNotification(id);
  }, ms + 400);
  await new Promise(resolve => setTimeout(resolve, ms + 400));
}

export const showNotification = async (data: NotificationData, dismissIn?: number) => {
  notification.update((val) => {
    val.push(data);
    return val;
  });

  if (dismissIn) {
    await dismissNotificationIn(data.id, dismissIn);
  }
}