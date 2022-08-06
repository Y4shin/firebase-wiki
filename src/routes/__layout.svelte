<script lang="ts">
  import "../app.css";
  import NavTop from "$lib/components/nav_top.svelte";
  import NavBottom from "$lib/components/nav_bottom.svelte";
  import Notification from "$lib/components/notification.svelte";
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

<div class="flex flex-col h-screen">
  <div class="sticky top-0 msm:hidden">
    <NavTop bind:loggedIn bind:currentPage bind:backLink />
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
  <div class="flex-grow text-t-reg-lgt dark:text-t-reg-drk mx-6 my-4">
    <slot />
  </div>
  <div class="sticky bottom-0 md:hidden">
    <NavBottom bind:loggedIn bind:currentPage bind:backLink />
  </div>
</div>
