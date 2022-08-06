<script lang="ts">
  import {routeUp, currentItem, userData} from "$lib/stores";
  import {showNotification} from "$lib/notification";
  import {auth, db} from "$lib/firebase";
  import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
  import {collection, doc, getDoc} from "firebase/firestore";
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

  const login = async () => {
    if (email.length === 0 || password.length === 0) {
      showNotification({type: "warning", message: "Email and password are required"});
      return;
    }
    try {
      const userObj = await signInWithEmailAndPassword(auth, email, password);
      console.log(userObj.user.uid);
      const profileCollection = collection(db, "profile");
      const profileDoc = doc(profileCollection, userObj.user.uid);
      const profile = await getDoc(profileDoc);
      const profileData = profile.data();
      userData.set({
        name: profileData?.name || "",
      });
      showNotification({
        type: "success",
        message: `Logged in successfully as ${
          profileData?.name || ""
        }. You will be redirected to the home page shortly.`,
      }, 3500);
      window.location.href = "/";
    } catch (error: any) {
      if (error.code === "auth/invalid-email") {
        showNotification({
          type: "error",
          message: "Invalid email address",
        });
      } else if (error.code === "auth/user-not-found") {
        showNotification({
          type: "error",
          message: "User not found",
        });
      } else if (error.code === "auth/wrong-password") {
        showNotification({
          type: "error",
          message: "Wrong password",
        });
      } else {
        showNotification({
          type: "error",
          message: "An error occurred",
        });
      }
    }
  };

  routeUp.set("/");
  currentItem.set("login");
</script>

<div class="bg-p-pri-lgt dark:bg-p-pri-drk rounded-md p-4">
  <div
    class="flex msm:flex-col md:flex-row msm:mx-4 md:mx-10 mb-6 items-center"
  >
    <span class="basis-1/4 text-lg msm:mb-2">E-Mail</span>
    <input
      on:keydown={(event) => {
        if (event.key === "Enter") login();
      }}
      type="email"
      class="basis-3/4 rounded-md bg-p-bgr-lgt dark:bg-p-pri-drk-hgl px-4 py-2 text-lg"
      bind:value={email}
    />
  </div>
  <div
    class="flex msm:flex-col md:flex-row msm:mx-4 md:mx-10 my-6 items-center"
  >
    <span class="basis-1/4 text-lg msm:mb-2">Password</span>
    <input
      on:keydown={(event) => {
        if (event.key === "Enter") login();
      }}
      type="password"
      class="basis-3/4 rounded-md bg-p-bgr-lgt dark:bg-p-pri-drk-hgl px-4 py-2 text-lg"
      bind:value={password}
    />
  </div>
  <div class="flex flex-row msm:mx-10 mt-6 items-center justify-center">
    <button
      on:click={login}
      class="basis-1/3 rounded-md bg-p-bgr-lgt dark:bg-p-pri-drk-hgl hover:bg-p-acc-lgt hover:dark:bg-p-acc-drk px-4 h-10 text-lg transition-colors duration-300"
      >Login</button
    >
  </div>
</div>
