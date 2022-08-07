<script lang="ts">
  import GoAlert from "svelte-icons/go/GoAlert.svelte";
  import GoInfo from "svelte-icons/go/GoInfo.svelte";
  import GoStop from "svelte-icons/go/GoStop.svelte";
  import GoCheck from "svelte-icons/go/GoCheck.svelte";
  import MdClose from "svelte-icons/md/MdClose.svelte";
  import {createEventDispatcher} from "svelte";
  export var type: "success" | "error" | "info" | "warning";
  export var message: string;

  const dispatch = createEventDispatcher();

  const close = () => {
    dispatch("close");
  };
</script>

<div
  on:click={close}
  class="flex items-center border-t-reg-lgt dark:border-t-reg-drk text-sm text-t-reg-lgt dark:text-t-reg-drk rounded-md bg-p-suc-lgt {type ===
  'success'
    ? 'bg-p-suc-lgt dark:bg-p-suc-drk'
    : ''} {type === 'error' ? 'bg-p-fal-lgt dark:bg-p-fal-drk' : ''} {type ===
  'info'
    ? 'bg-p-inf-lgt dark:bg-p-inf-drk'
    : ''} {type === 'warning' ? 'bg-p-war-lgt dark:bg-p-war-drk' : ''}"
>
  <div class="inline-block w-10 h-10 mr-4 my-2 ml-2 md:mr-8 md:my-4 md:ml-4">
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
  <p class="px-4 my-4">{message}</p>
  <div class="inline-block w-10 h-10 ml-4 my-2 mr-2 md:ml-8 md:my-4 md:mr-4">
    <div
      class="rounded-full w-10 h-10 cursor-pointer {type === 'success'
        ? 'bg-p-suc-lgt-hgl dark:bg-p-suc-drk-hgl'
        : ''} {type === 'error'
        ? 'bg-p-fal-lgt-hgl dark:bg-p-fal-drk-hgl'
        : ''} {type === 'info'
        ? 'bg-p-inf-lgt-hgl dark:bg-p-inf-drk-hgl'
        : ''} {type === 'warning'
        ? 'bg-p-war-lgt-hgl dark:bg-p-war-drk-hgl'
        : ''}"
    >
      <MdClose />
    </div>
  </div>
</div>
