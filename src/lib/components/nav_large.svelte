<script lang="ts">
  import FaBookOpen from "svelte-icons/fa/FaBookOpen.svelte";
  import FaChevronLeft from "svelte-icons/go/GoChevronLeft.svelte";

  export var loggedIn: boolean;
  export var currentPage: "home" | "posts" | "wiki" | "profile" | "login";
  export var backLink: string;
</script>

<nav
  class="msm:hidden w-auto py-4 px-4 md:px-8 m-4 rounded-md bg-p-pri-lgt dark:bg-p-pri-drk text-t-reg-lgt dark:text-t-reg-drk"
>
  <div class="relative flex flex-row justify-between align-middle items-center">
    <div class="p-0 align-middle">
      <a href="{backLink}" class="{currentPage==="home" ? "invisible ": ""}align-middle inline-block p-2 h-10 w-10 mr-4 hover:text-t-reg-lgt-hgl hover:dark:text-t-reg-drk-hgl transition-colors duration-300">
        <FaChevronLeft />
      </a>
      <div
        class="align-middle inline-block p-2 bg-p-acc-lgt dark:bg-p-acc-drk rounded-md h-10 w-10"
      >
        <FaBookOpen />
      </div>
    </div>
    <div>
      <a href="/" class="text-t-reg-lgt dark:text-t-reg-drk mr-2 lg:mr-4 {currentPage === 'home' ? 'text-t-reg-lgt-hgl dark:text-t-reg-drk-hgl' : 'hover:text-t-reg-lgt-hgl hover:dark:text-t-reg-drk-hgl transition-colors duration-300'}"
        >Home</a
      >
      <a href="#" class="text-t-reg-lgt dark:text-t-reg-drk mx-2 lg:mr-4 {currentPage === 'posts' ? 'text-t-reg-lgt-hgl dark:text-t-reg-drk-hgl' : 'hover:text-t-reg-lgt-hgl hover:dark:text-t-reg-drk-hgl transition-colors duration-300'}"
        >Posts</a
      >
      <a href="#" class="text-t-reg-lgt dark:text-t-reg-drk mx-2 lg:mr-4 {currentPage === 'wiki' ? 'text-t-reg-lgt-hgl dark:text-t-reg-drk-hgl' : 'hover:text-t-reg-lgt-hgl hover:dark:text-t-reg-drk-hgl transition-colors duration-300'}"
        >Wiki</a
      >
      {#if loggedIn}
        <a href="/profile" class="text-t-reg-lgt dark:text-t-reg-drk ml-2 lg:mr-4 {currentPage === 'profile' ? 'text-t-reg-lgt-hgl dark:text-t-reg-drk-hgl' : 'hover:text-t-reg-lgt-hgl hover:dark:text-t-reg-drk-hgl transition-colors duration-300'}"
          >Profile</a
        >
      {:else}
        <a href="/login" class="text-t-reg-lgt dark:text-t-reg-drk ml-2 lg:mr-4 {currentPage === 'login' ? 'text-t-reg-lgt-hgl dark:text-t-reg-drk-hgl' : 'hover:text-t-reg-lgt-hgl hover:dark:text-t-reg-drk-hgl transition-colors duration-300'}"
          >Login</a
        >
      {/if}
    </div>
  </div>
</nav>
