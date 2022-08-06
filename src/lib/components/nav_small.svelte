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
      class="flex justify-around py-2 {currentPage === 'home'
        ? 'bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl'
        : 'hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl transition-colors duration-300'}"
    >
      <span class="align-middle justify-center inline-block p-2 h-10 w-10">
        <FaHome />
      </span>
    </a>
    <a
      href="#"
      class="flex justify-around py-2 {currentPage === 'posts'
        ? 'bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl'
        : 'hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl transition-colors duration-300'}"
    >
      <span class=" align-middle justify-center inline-block p-2 h-10 w-10">
        <FaNewspaper />
      </span>
    </a>
    <a
      href="#"
      class="flex justify-around py-2 {currentPage === 'wiki'
        ? 'bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl'
        : 'hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl transition-colors duration-300'}"
    >
      <span class=" align-middle justify-center inline-block p-2 h-10 w-10">
        <FaBook />
      </span>
    </a>
    {#if loggedIn}
      <a
        href="/profile"
        class="flex justify-around py-2 rounded-r-md {currentPage === 'profile'
          ? 'bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl'
          : 'hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl transition-colors duration-300'}"
      >
        <span class=" align-middle justify-center inline-block p-2 h-10 w-10">
          <FaPortrait />
        </span>
      </a>
    {:else}<a
        href="/login"
        class="flex justify-around py-2 rounded-r-md {currentPage === 'login'
          ? 'bg-p-pri-lgt-hgl dark:bg-p-pri-drk-hgl'
          : 'hover:bg-p-pri-lgt-hgl hover:dark:bg-p-pri-drk-hgl transition-colors duration-300'}"
      >
        <span class=" align-middle justify-center inline-block p-2 h-10 w-10">
          <FaDoorOpen />
        </span>
      </a>
    {/if}
  </div>
</nav>
