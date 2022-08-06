import {writable, type Writable} from "svelte/store";

export const routeUp: Writable<string> = writable("/");
export const currentItem: Writable<
  "home" | "posts" | "wiki" | "profile" | "login"
> = writable("home");

export const notification: Writable<{
  type: "success" | "error" | "info" | "warning";
  message: string;
} | null> = writable(null);

export const userData: Writable<{
  name: string;
} | null> = writable(null);

export const dismissNotificationIn = async (ms: number) => {
  setTimeout(() => {
    notification.set(null);
  }, ms + 400);
  await new Promise(resolve => setTimeout(resolve, ms + 400));
}