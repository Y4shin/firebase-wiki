<script lang="ts">
  import "../app.css";
  import NavLarge from "$lib/components/nav_large.svelte";
  import NavSmall from "$lib/components/nav_small.svelte";
  import Notification from "$lib/components/notification.svelte";
  import FaChevronLeft from "svelte-icons/go/GoChevronLeft.svelte";
  import {fly} from "svelte/transition";
  import {sineInOut} from "svelte/easing";
  import {routeUp, currentItem} from "$lib/stores";
  import {notification, dismissNotification} from "$lib/notification";
  import {auth} from "$lib/firebase";
  import {onAuthStateChanged} from "firebase/auth";
  import {onMount} from "svelte";

  var uid: string | null = null;
  var loggedIn: boolean = false;
  var currentPage: "home" | "posts" | "wiki" | "profile" | "login" = "home";
  var notificationShow: boolean = false;
  var notificationMsg: string = "";
  var notificationType: "success" | "error" | "info" | "warning" = "info";

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

  notification.subscribe((val) => {
    notificationMsg = val?.message || "";
    notificationType = val?.type || "info";
    notificationShow = val !== null;
  });

  const disableNotification = () => {
    notification.set(null);
  };
</script>
{#if notificationShow}
  <div on:click={dismissNotification} class="flex justify-evenly w-full top-0 fixed z-20 mt-4">
  <div transition:fly={{y: -60, easing: sineInOut, duration:400}}>
    <Notification
      bind:message={notificationMsg}
      bind:type={notificationType}
      on:close={disableNotification}
    />
  </div></div>
{/if}
<div class="sticky top-0 z-10">
  <NavLarge bind:loggedIn bind:currentPage bind:backLink />
  <NavSmall bind:loggedIn bind:currentPage />
</div>
<div class="text-t-reg-lgt dark:text-t-reg-drk mx-6 my-4">
  <slot />
</div>
<a href="{backLink}" class="md:hidden text-3xl bottom-0 fixed m-4 p-2 w-16 h-16 inline-block rounded-full text-t-reg-lgt dark:text-t-reg-drk bg-p-pri-lgt dark:bg-p-pri-drk hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl">
<FaChevronLeft/>
</a>
