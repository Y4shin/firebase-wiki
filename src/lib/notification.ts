import {writable, type Writable} from "svelte/store";
import {v4 as uuidv4} from "uuid";

export type NotificationPayload = {
  message: string;
  type: "success" | "error" | "info" | "warning";
  id?: string;
}

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

export const showNotification = async (data: NotificationPayload, dismissIn?: number) => {
  let payload: NotificationData;
    if (!data.id) {
      payload = {
        message: data.message,
        type: data.type,
        id: uuidv4(),
      };
    } else {
      payload = data as NotificationData;
    }
  notification.update((val) => {
    val.push(payload);
    return val;
  });

  if (dismissIn) {
    await dismissNotificationIn(payload.id, dismissIn);
  }
}

export const dismissAll = () => {
  notification.set([]);
}