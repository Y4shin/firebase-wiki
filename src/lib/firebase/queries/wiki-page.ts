import {db} from "$lib/firebase";
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
  endBefore,
  limitToLast,
  type DocumentSnapshot,
} from "firebase/firestore";
import {showNotification} from "$lib/notification";

const wikiPageCollection = collection(db, "wiki-page");
const categoryBucketCollection = collection(db, "wiki-page-bucket-by-category");
const wikiSearchIndexCollection = collection(db, "wiki-page-search-index");

export const getInitialPage = async (pageSize: number) => {
  try {
    const pageQuery = query(
      wikiPageCollection,
      orderBy("lastRevision", "desc"),
      limit(pageSize),
    );
    const pageDocs = await getDocs(pageQuery);
    return pageDocs.docs;
  } catch (e) {
    showNotification(
      {type: "error", message: "Could not fetch initial page."},
      5000,
    );
    return [];
  }
};

export const getNextPage = async (
  pageSize: number,
  lastDoc: DocumentSnapshot,
) => {
  try {
    const pageQuery = query(
      wikiPageCollection,
      orderBy("lastRevision", "desc"),
      limit(pageSize),
      startAfter(lastDoc),
    );
    const pageDocs = await getDocs(pageQuery);
    if (pageDocs.docs.length === 0) {
      return null;
    }
    return pageDocs.docs;
  } catch (e) {
    showNotification(
      {type: "error", message: "Could not fetch next page."},
      5000,
    );
    return null;
  }
};

export const getPreviousPage = async (
  pageSize: number,
  firstDoc: DocumentSnapshot,
) => {
  try {
    const pageQuery = query(
      wikiPageCollection,
      orderBy("lastRevision", "desc"),
      limitToLast(pageSize),
      endBefore(firstDoc),
    );
    const pageDocs = await getDocs(pageQuery);
    if (pageDocs.docs.length === 0) {
      return null;
    }
    return pageDocs.docs;
  } catch (e) {
    showNotification(
      {type: "error", message: "Could not fetch previous page."},
      5000,
    );
    return null;
  }
};

export const getInitialPageByCategory = async (
  category: string,
  pageSize: number,
) => {
  try {
    const bucketDoc = doc(categoryBucketCollection, category);
    const documentCollection = collection(bucketDoc, "documents");
    const pageQuery = query(
      documentCollection,
      orderBy("lastRevision", "desc"),
      limit(pageSize),
    );
    const pageDocs = await getDocs(pageQuery);
    return pageDocs.docs;
  } catch (e) {
    showNotification(
      {type: "error", message: "Could not fetch initial category page."},
      5000,
    );
    console.log(e);
    return null;
  }
};

export const getNextPageByCategory = async (
  category: string,
  pageSize: number,
  lastDoc: DocumentSnapshot,
) => {
  try {
    const bucketDoc = doc(categoryBucketCollection, category);
    const documentCollection = collection(bucketDoc, "documents");
    const pageQuery = query(
      documentCollection,
      orderBy("lastRevision", "desc"),
      limit(pageSize),
      startAfter(lastDoc),
    );
    const pageDocs = await getDocs(pageQuery);
    if (pageDocs.docs.length === 0) {
      return null;
    }
    return pageDocs.docs;
  } catch (e) {
    showNotification(
      {type: "error", message: "Could not fetch next category page."},
      5000,
    );
    return null;
  }
};

export const getPreviousPageByCategory = async (
  category: string,
  pageSize: number,
  firstDoc: DocumentSnapshot,
) => {
  try {
    const bucketDoc = doc(categoryBucketCollection, category);
    const documentCollection = collection(bucketDoc, "documents");
    const pageQuery = query(
      documentCollection,
      orderBy("lastRevision", "desc"),
      limitToLast(pageSize),
      endBefore(firstDoc),
    );
    const pageDocs = await getDocs(pageQuery);
    if (pageDocs.docs.length === 0) {
      return null;
    }
    return pageDocs.docs;
  } catch (e) {
    showNotification(
      {type: "error", message: "Could not fetch previous category page."},
      5000,
    );
    return null;
  }
}

export const getInitialWikiPageBySearch = async (
  search: string,
  pageSize: number
) => {
  try {
    const searchQuery = query(
      wikiSearchIndexCollection,
      where("searchIndex", "array-contains", search),
      orderBy("lastRevision", "desc"),
      limit(pageSize),
    );
    const searchDocs = await getDocs(searchQuery);
    return searchDocs.docs;
  } catch (e) {
    showNotification(
      {type: "error", message: "Could not fetch wiki page by search."},
      5000,
    );
    return null;
  }
}

export const getNextWikiPageBySearch = async (
  search: string,
  pageSize: number,
  lastDoc: DocumentSnapshot
) => {
  try {
    const searchQuery = query(
      wikiSearchIndexCollection,
      where("searchIndex", "array-contains", search),
      orderBy("lastRevision", "desc"),
      limit(pageSize),
      startAfter(lastDoc),
    );
    const searchDocs = await getDocs(searchQuery);
    if (searchDocs.docs.length === 0) {
      return null;
    }
    return searchDocs.docs;
  } catch (e) {
    showNotification(
      {type: "error", message: "Could not fetch next wiki page by search."},
      5000,
    );
    return null;
  }
}

export const getPreviousWikiPageBySearch = async (
  search: string,
  pageSize: number,
  firstDoc: DocumentSnapshot
) => {
  try {
    const searchQuery = query(
      wikiSearchIndexCollection,
      where("searchIndex", "array-contains", search),
      orderBy("lastRevision", "desc"),
      limitToLast(pageSize),
      endBefore(firstDoc),
    );
    const searchDocs = await getDocs(searchQuery);
    if (searchDocs.docs.length === 0) {
      return null;
    }
    return searchDocs.docs;
  } catch (e) {
    showNotification(
      {type: "error", message: "Could not fetch previous wiki page by search."},
      5000,
    );
    return null;
  }
}