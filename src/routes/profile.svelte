<script lang="ts">
  import {routeUp, currentItem} from "$lib/stores";
  import {app, auth} from "$lib/firebase";
  import {onAuthStateChanged} from "firebase/auth";
  import {getFunctions, httpsCallable} from "firebase/functions";
  import {onMount} from "svelte";
  import {v4 as uuidv4} from "uuid";
  import {showNotification} from "$lib/notification";

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
      try {
        const functions = getFunctions(app);
        const log = httpsCallable(functions, "createLog");
        const res = await log(error);
      } catch (error2) {
        showNotification(
          {
            type: "error",
            message: "Cannot write to server logs.",
            id: uuidv4(),
          },
          3000,
        );
      }
    }
  };

  routeUp.set("/");
  currentItem.set("profile");
</script>

<div class="bg-p-pri-lgt dark:bg-p-pri-drk rounded-md p-4">
  {#if loggedIn}
    <div class="flex flex-row justify-center">
      <button
        on:click={logout}
        class="bg-t-fal-lgt dark:bg-t-fal-drk p-2 rounded-md">Logout</button
      >
    </div>
  {:else}
    <p>You are not logged in</p>
  {/if}
</div>
