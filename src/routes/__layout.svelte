<script lang="ts">
  import "../app.css";
  import NavLarge from "$lib/components/nav_large.svelte";
  import NavSmall from "$lib/components/nav_small.svelte";
  import Notifications from "$lib/components/notifications.svelte"
  import FaChevronLeft from "svelte-icons/go/GoChevronLeft.svelte";
  //import {fly} from "svelte/transition";
  //import {sineInOut} from "svelte/easing";
  import {routeUp, currentItem} from "$lib/stores";
  //import {
  //  notification,
  //  dismissNotification,
  //  type NotificationData,
  //} from "$lib/notification";
  import {auth} from "$lib/firebase";
  import {onAuthStateChanged} from "firebase/auth";
  import {onMount} from "svelte";

  var uid: string | null = null;
  var loggedIn: boolean = false;
  var currentPage: "home" | "posts" | "wiki" | "profile" | "login" = "home";

  var backLink: string = "/";
  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      uid = user?.uid || null;
      loggedIn = uid !== null;
    });
  });

  routeUp.subscribe((val) => {
    backLink = val;
  });

  currentItem.subscribe((val) => {
    currentPage = val;
  });
</script>

<div class="flex flex-col w-full">
</div>
<div class="sticky top-0 z-10">
  <NavLarge bind:loggedIn bind:currentPage bind:backLink />
  <NavSmall bind:loggedIn bind:currentPage />
</div>
<div class="text-t-reg-lgt dark:text-t-reg-drk mx-6 my-4">
  <slot />
</div>
<a
  href={backLink}
  class="md:hidden text-3xl bottom-0 fixed m-4 p-2 w-16 h-16 inline-block rounded-full text-t-reg-lgt dark:text-t-reg-drk bg-p-pri-lgt dark:bg-p-pri-drk hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl"
>
  <FaChevronLeft />
</a>
<div class="fixed bottom-0 right-0">
  <Notifications/>
</div>
