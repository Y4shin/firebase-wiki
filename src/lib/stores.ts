import {writable, type Writable} from "svelte/store";

export const routeUp: Writable<string> = writable("/");
export const currentItem: Writable<
  "home" | "posts" | "wiki" | "profile" | "login"
> = writable("home");

export const userData: Writable<{
  name: string;
} | null> = writable(null);