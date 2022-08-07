<script lang="ts">
  import GoChevronLeft from "svelte-icons/go/GoChevronLeft.svelte";
  import GoChevronRight from "svelte-icons/go/GoChevronRight.svelte";
  import {createEventDispatcher} from "svelte";

  const dispatch = createEventDispatcher();
</script>

<div class="flex justify-between items-center">
  <button
  on:click={() => dispatch("previousPage")}
    class="h-10 w-10 bg-p-acc-lgt dark:bg-p-acc-drk hover:bg-p-acc-lgt-hgl hover:dark:bg-p-acc-drk-hgl rounded-full"
    ><GoChevronLeft /></button
  >
  <button
    on:click={() => dispatch("nextPage")}
    class="h-10 w-10 bg-p-acc-lgt dark:bg-p-acc-drk hover:bg-p-acc-lgt-hgl hover:dark:bg-p-acc-drk-hgl rounded-full"
    ><GoChevronRight /></button
  >
</div>
