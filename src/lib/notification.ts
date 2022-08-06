import {writable, type Writable} from "svelte/store";

export type NotificationData = {
  message: string;
  type: "success" | "error" | "info" | "warning";
};

export const notification: Writable<NotificationData | null> = writable(null);

export const dismissNotificationIn = async (ms: number) => {
  setTimeout(() => {
    notification.set(null);
  }, ms + 400);
  await new Promise(resolve => setTimeout(resolve, ms + 400));
}

export const showNotification = async (data: NotificationData, dismissIn?: number) => {
  notification.set(data);
  if (dismissIn) {
    await dismissNotificationIn(dismissIn);
  }
}

export const dismissNotification = () => {
  notification.set(null);
}