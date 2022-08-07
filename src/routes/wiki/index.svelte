<script lang="ts">
  // ==== Imports ====
  import IoIosDocument from "svelte-icons/io/IoIosDocument.svelte";
  import {currentItem} from "$lib/stores";
  import {auth, db} from "$lib/firebase";
  import {onAuthStateChanged} from "firebase/auth";
  import {onMount} from "svelte";
  import {showNotification} from "$lib/notification";
  import {v4 as uuidv4} from "uuid";
  import type {DocumentData, DocumentSnapshot} from "firebase/firestore";
  import {
    getInitialPage,
    getNextPage,
    getPreviousPage,
    getInitialPageByCategory,
    getNextPageByCategory,
    getPreviousPageByCategory,
    getInitialWikiPageBySearch,
    getNextWikiPageBySearch,
    getPreviousWikiPageBySearch,
  } from "$lib/firebase/queries/wiki-page";
  import {getCategories} from "$lib/firebase/queries/category";
  import Paginate from "$lib/components/paginate.svelte";

  // ==== Authentication Variables ====
  var uid: string | null = null;
  var loggedIn: boolean = false;

  // ==== Page Variables ====

  let filterStyleDisplay: 'category' | 'search' = 'category';
  let perPage = 12;
  let pagesRawData: DocumentSnapshot<DocumentData>[] = [];
  let pages: {id: string; data: DocumentData}[] = [];

  // ==== Category Variables ====
  let category: {id: string | null; name: string} = {
    id: null,
    name: "All",
  };
  let categories: {id: string | null; name: string}[] = [];

  // ==== On Page Load ====
  onMount(async () => {
    onAuthStateChanged(auth, (user) => {
      uid = user?.uid || null;
      loggedIn = uid !== null;
    });

    categories = ([{id: null, name: "All"}] as {id: string | null; name: string}[]).concat(
      (await getCategories())?.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
        };
      }) || [],
    );
    pagesRawData = await getInitialPage(perPage);
  });

  // ==== Page Change Listeners ====
  $: pages =
    pagesRawData?.map((val) => {
      return {
        id: val.id,
        data: val.data()!,
      };
    }) || [];
  $: if (category.id) {
    getInitialPageByCategory(category.id!, perPage).then((val) => {
      pagesRawData = val || [];
    });
  } else {
    getInitialPage(perPage).then((val) => {
      pagesRawData = val || [];
    });
  }

  // ==== Page Change Callbacks ====

  const nextPage = async () => {
    if (pagesRawData.length === 0) {
      return;
    }
    var nextPageRawData: DocumentSnapshot<DocumentData>[] | null;
    if (category.id) {
      nextPageRawData = await getNextPageByCategory(category.id!, perPage, pagesRawData[pagesRawData.length - 1]);
    } else {
      nextPageRawData = await getNextPage(perPage, pagesRawData[pagesRawData.length - 1]);
    }
    if (nextPageRawData) {
      pagesRawData = nextPageRawData;
    }
  };

  const prevPage = async () => {
    if (pagesRawData.length === 0) {
      return;
    }
    var prevPageRawData: DocumentSnapshot<DocumentData>[] | null;
    if (category.id) {
      prevPageRawData = await getPreviousPageByCategory(category.id!, perPage, pagesRawData[0]);
    } else {
      prevPageRawData = await getPreviousPage(perPage, pagesRawData[0]);
    }
    if (prevPageRawData) {
      pagesRawData = prevPageRawData;
    }
  };

  // ==== Setting Page for Navbar ====
  currentItem.set("wiki");
</script>

<div class="bg-p-pri-lgt dark:bg-p-pri-drk rounded-md">
  <div class="grid grid-cols-2 bg-p-acc-lgt dark:bg-p-acc-drk rounded-t-md">
    <button on:click={() => {filterStyleDisplay='category';}} class="p-2 rounded-tl-md hover:bg-p-acc-lgt-hgl hover:dark:bg-p-acc-drk-hgl">Category</button>
    <button on:click={() => {filterStyleDisplay='search';}} class="p-2 rounded-tr-md hover:bg-p-acc-lgt-hgl hover:dark:bg-p-acc-drk-hgl">Search</button>
  </div>
  <!-- TODO: Create Text Search interface and implement functionality. -->
  {#if filterStyleDisplay === 'category'}
  <div class="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-4 lg:gap-6 mb-12 p-4">
    <span class="md:basis-1/6 px-4 msm:mb-4">Category</span>
    <select bind:value={category} class="bg-p-bgr-lgt dark:bg-p-bgr-drk p-2 rounded-md msm:w-full md:basis-1/3">
      {#each categories as cat}
        <option value={cat}>
          {cat.name}
        </option>
      {/each}
    </select>
  </div>
  {:else if filterStyleDisplay === 'search'}
  <p>Text Search</p>
  {/if}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 lg:gap-6 px-4">
    {#each pages as page}
      <a href="/wiki/{page.id}" class="bg-p-bgr-lgt dark:bg-p-bgr-drk py-2 rounded-md grid grid-cols-4">
        <div class="col-span-1 flex items-center justify-around">
          <div class="h-10 w-10 text-p-acc-lgt dark:text-p-acc-drk">
            <IoIosDocument />
          </div>
        </div>
        <div class="col-span-3 flex flex-col items-center">
          <p class="text-2xl mb-2">{page.data.name}</p>
          <p class="text-sm">
            {category.id ? category.name : categories.filter((val) => val.id === page.data.category)[0]?.name}
          </p>
        </div>
      </a>
    {/each}
  </div>
  <div class="px-4 pt-8 pb-4">
    <Paginate on:nextPage={nextPage} on:previousPage={prevPage} />
  </div>
</div>
