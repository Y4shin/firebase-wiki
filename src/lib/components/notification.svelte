<script lang="ts">
  import GoAlert from "svelte-icons/go/GoAlert.svelte";
  import GoInfo from "svelte-icons/go/GoInfo.svelte";
  import GoStop from "svelte-icons/go/GoStop.svelte";
  import GoCheck from "svelte-icons/go/GoCheck.svelte";
  import { createEventDispatcher } from "svelte";
  export var type: "success" | "error" | "info" | "warning";
  export var message: string;

  const dispatch = createEventDispatcher();

  const label = {
    success: "Success",
    error: "Error",
    info: "Info",
    warning: "Warning"
  };

  const close = () => {
    dispatch("close");
  }
</script>

<div
  on:click={close}
  class="flex p-4 mt-4 text-sm text-t-reg-lgt dark:text-t-reg-drk rounded-md bg-p-suc-lgt {type ===
  'success'
    ? 'bg-p-suc-lgt dark:bg-p-suc-drk'
    : ''} {type === 'error' ? 'bg-p-fal-lgt dark:bg-p-fal-drk' : ''} {type ===
  'info'
    ? 'bg-p-inf-lgt dark:bg-p-inf-drk'
    : ''} {type === 'warning' ? 'bg-p-war-lgt dark:bg-p-war-drk' : ''}"
  role="alert"
>
  <div class="inline-block w-10 h-10 mr-8">
    {#if type === "success"}
      <GoCheck />
    {:else if type === "error"}
      <GoStop />
    {:else if type === "info"}
      <GoInfo />
    {:else if type === "warning"}
      <GoAlert />
    {/if}
  </div>
  <span class="sr-only"></span>
  <div>
    <span class="font-medium">{label[type]}</span> {message}
  </div>
</div>
