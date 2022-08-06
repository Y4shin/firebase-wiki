<script lang="ts">
  import "../app.css";
  import NavLarge from "$lib/components/nav_large.svelte";
  import NavSmall from "$lib/components/nav_small.svelte";
  import Notification from "$lib/components/notification.svelte";
  import FaChevronLeft from "svelte-icons/fa/FaChevronLeft.svelte";
  import {routeUp, currentItem, notification} from "$lib/stores";
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

<div class="sticky top-0">
  <NavLarge bind:loggedIn bind:currentPage bind:backLink />
  <NavSmall bind:loggedIn bind:currentPage />
</div>
{#if notificationShow}
  <div class="mx-6">
    <Notification
      bind:message={notificationMsg}
      bind:type={notificationType}
      on:close={disableNotification}
    />
  </div>
{/if}
<div class="text-t-reg-lgt dark:text-t-reg-drk mx-6 my-4">
  <slot />
</div>
<a href="{backLink}" class="text-3xl bottom-0 fixed m-4 p-2 w-16 h-16 inline-block rounded-full text-t-reg-lgt dark:text-t-reg-drk bg-p-pri-lgt dark:bg-p-pri-drk hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl">
<FaChevronLeft/>
</a>
