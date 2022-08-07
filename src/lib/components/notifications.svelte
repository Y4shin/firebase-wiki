<script lang="ts">
  import {
    dismissNotification,
    notification,
    type NotificationData,
    dismissAll
  } from "$lib/notification";
  import {fly} from "svelte/transition";
  import Notification from "$lib/components/notification.svelte";

  let notifications: NotificationData[];

  notification.subscribe((val) => {
    notifications = val;
  });
</script>

<div class="flex flex-col mr-4 mb-2">
  {#each notifications as not}
    <div class="my-2 flex justify-end" transition:fly={{x: 200}}>
      <Notification
        type={not.type}
        message={not.message}
        on:close={() => dismissNotification(not.id)}
      />
    </div>
  {/each}
  {#if notifications.length > 0}
  <button on:click={dismissAll} class="bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl p-2 mb-2 rounded-md flex justify-center text-sm">
    <p>Close all</p>
  </button>
{/if}
</div>
