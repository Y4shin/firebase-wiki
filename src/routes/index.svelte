<script lang="ts">
  import {currentItem} from "$lib/stores";
  import {auth} from "$lib/firebase";
  import {onAuthStateChanged} from "firebase/auth";
  import {onMount} from "svelte";

  var uid: string | null = null;
  var loggedIn: boolean = false;
  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      uid = user?.uid || null;
      loggedIn = uid !== null;
    });
  });

  currentItem.set("home");
</script>

<div class="bg-p-pri-lgt dark:bg-p-pri-drk rounded-md p-4">
  {#if loggedIn}
    <p>You are logged in as {uid}</p>
  {:else}
    <p>You are not logged in</p>
  {/if}
</div>
