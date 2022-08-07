import {db} from "$lib/firebase";
import {
  collection,
  doc,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  endBefore,
  limitToLast,
  type DocumentSnapshot,
} from "firebase/firestore";
import {showNotification} from "$lib/notification";

const categoryCollection = collection(db, "category");

export const getCategories = async () => {
  try {
    const categories = await getDocs(categoryCollection);
    return categories.docs;
  } catch (e) {
    showNotification(
      {type: "error", message: "Could not fetch categories."},
      5000,
    );
    return null;
  }
}