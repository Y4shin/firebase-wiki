<script lang="ts">
  import {routeUp, currentItem} from "$lib/stores";
  import {auth, db} from "$lib/firebase";
  import {onAuthStateChanged} from "firebase/auth";
  import {onMount} from "svelte";

  var email: string = "";
  var password: string = "";

  var uid: string | null = null;
  var loggedIn: boolean = false;
  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      uid = user?.uid || null;
      loggedIn = uid !== null;
    });
  });

  const logout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/";
    } catch (error) {
      //TODO Error Modal
      console.log(error);
    }
  };

  routeUp.set("/");
  currentItem.set("profile");
</script>

<div class="bg-p-pri-lgt dark:bg-p-pri-drk rounded-md p-4">
  {#if loggedIn}
    <div class="flex flex-row justify-center">
      <button on:click={logout} class="bg-t-fal-lgt dark:bg-t-fal-drk p-2 rounded-md">Logout</button>
    </div>
  {:else}
    <p>You are not logged in</p>
  {/if}
</div>
