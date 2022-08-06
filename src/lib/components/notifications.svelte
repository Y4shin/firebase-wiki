<script lang="ts">
  import {
    dismissNotification,
    notification,
    type NotificationData,
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
</div>
