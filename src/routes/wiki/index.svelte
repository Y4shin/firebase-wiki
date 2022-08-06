<script lang="ts">
  import {currentItem} from "$lib/stores";
  import {auth, db} from "$lib/firebase";
  import {onAuthStateChanged} from "firebase/auth";
  import {onMount} from "svelte";
  import {collection, doc, getDocs, orderBy, where, startAt, limit, query} from "firebase/firestore";

  var uid: string | null = null;
  var loggedIn: boolean = false;
  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      uid = user?.uid || null;
      loggedIn = uid !== null;
    });
  });

  let page = 0;
  let totalPages = 0;
  const getPage = async (page: number) => {
    const wikiCollection = collection(db, "wiki-page");
    const wikiQuery = query(wikiCollection, orderBy("createdAt"), startAt(page), limit(10));
    const wikiDocs = await getDocs(wikiQuery);
    return wikiDocs.docs.map((doc) => doc.data());
  };

  currentItem.set("wiki");
</script>