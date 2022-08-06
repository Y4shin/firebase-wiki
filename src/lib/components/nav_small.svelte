<script lang="ts">
  import FaHome from "svelte-icons/fa/FaHome.svelte";
  import FaNewspaper from "svelte-icons/fa/FaNewspaper.svelte";
  import FaBook from "svelte-icons/fa/FaBook.svelte";
  import FaDoorOpen from "svelte-icons/fa/FaDoorOpen.svelte";
  import FaPortrait from "svelte-icons/fa/FaPortrait.svelte";

  export var loggedIn: boolean;
  export var currentPage: "home" | "posts" | "wiki" | "profile" | "login";
</script>

<nav
  class="md:hidden w-auto md:px-8 my-2 mx-4 rounded-md bg-p-pri-lgt dark:bg-p-pri-drk text-t-reg-lgt dark:text-t-reg-drk"
>
  <div
    class="grid grid-cols-4 divide-x-2 border-t-reg-lgt dark:border-t-reg-drk align-middle items-center"
  >
    <a
      href="/"
      class="flex justify-around py-2 rounded-l-md {currentPage === 'home'
        ? 'bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl'
        : 'hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl transition-colors duration-300'}"
    >
    <div class="flex justify-center items-center flex-col">
      <div class=" inline-block h-8 w-8 mb-2"><FaHome /></div>
      <p class="text-xs">Home</p>
    </div>
    </a>
    <a
      href="#"
      class="flex justify-around py-2 {currentPage === 'posts'
        ? 'bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl'
        : 'hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl transition-colors duration-300'}"
    >
      <div class="flex justify-center items-center flex-col">
        <div class=" inline-block h-8 w-8 mb-2"><FaNewspaper /></div>
        <p class="text-xs">Posts</p>
      </div>
    </a>
    <a
      href="#"
      class="flex justify-around py-2 {currentPage === 'wiki'
        ? 'bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl'
        : 'hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl transition-colors duration-300'}"
    >
      <div class="flex justify-center items-center flex-col">
        <div class=" inline-block h-8 w-8 mb-2"><FaBook /></div>
        <p class="text-xs">Wiki</p>
      </div>
    </a>
    {#if loggedIn}
      <a
        href="/profile"
        class="flex justify-around py-2 rounded-r-md {currentPage === 'profile'
          ? 'bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl'
          : 'hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl transition-colors duration-300'}"
      >
      <div class="flex justify-center items-center flex-col">
        <div class=" inline-block h-8 w-8 mb-2"><FaPortrait /></div>
        <p class="text-xs">Profile</p>
      </div>
      </a>
    {:else}<a
        href="/login"
        class="flex justify-around py-2 rounded-r-md {currentPage === 'login'
          ? 'bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl'
          : 'hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl transition-colors duration-300'}"
      >
      <div class="flex justify-center items-center flex-col">
        <div class=" inline-block h-8 w-8 mb-2"><FaDoorOpen /></div>
        <p class="text-xs">Login</p>
      </div>
      </a>
    {/if}
  </div>
</nav>
