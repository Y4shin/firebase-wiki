import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const powerSet = (term: string): string[] => {
  const words = term.split(" ");
  let result: string[] = [];
  words.forEach((val) => {
    const lower = val.toLowerCase();
    result = result.flatMap((val2) => [`${lower} ${val2}`, `${val2} ${lower}`, val2]);
    result.push(lower);
  });
  return result;
};

export const onWikiCreateFunction = functions
  .region("europe-west1")
  .firestore.document("wiki-page/{pageId}")
  .onCreate(async (snapshot, context) => {
    const adminFirestore = admin.firestore();
    // ==== Increment counter document for wiki-pages ====
    try {
      const counter = adminFirestore.collection("counter").doc("wiki-page");
      await counter.update("count", admin.firestore.FieldValue.increment(1));
    } catch (error) {
      functions.logger.error("Could not increment wiki-page counter", error);
    }
    // ==== Insert document into appropriate category-bucket ====
    try {
      const categoryDoc = adminFirestore.collection("wiki-page-bucket-by-category").doc(snapshot.data().category);
      const categoryBucket = categoryDoc.collection("documents");
      await Promise.all([
        await categoryBucket.doc(snapshot.id).set({
          lastRevision: snapshot.data().lastRevision,
          name: snapshot.data().name,
        }),
        await categoryDoc.update("count", admin.firestore.FieldValue.increment(1)),
      ]);
    } catch (error) {
      functions.logger.error("Could not add wiki-page to category bucket", error);
    }
    // ==== Generate search index ====
    try {
      const searchIndex = powerSet(snapshot.data().name);
      const searchCollection = adminFirestore.collection("wiki-page-search-index");
      await searchCollection.doc(snapshot.id).set({
        searchIndex,
        name: snapshot.data().name,
        category: snapshot.data().category,
      });
    } catch (error) {
      functions.logger.error("Could not generate wiki-page search index", error);
    }
  });

export const onWikiDeleteFunction = functions
  .region("europe-west1")
  .firestore.document("wiki-page/{pageId}")
  .onDelete(async (snapshot, context) => {
    const adminFirestore = admin.firestore();
    // ==== Decrenment counter document for wiki-pages ====
    try {
      const counter = adminFirestore.collection("counter").doc("wiki-page");
      await counter.update("count", admin.firestore.FieldValue.increment(-1));
    } catch (error) {
      functions.logger.error("Could not decrement wiki-page counter", error);
    }
    // ==== Delete document from appropriate category-bucket ====
    try {
      const categoryDoc = adminFirestore.collection("wiki-page-bucket-by-category").doc(snapshot.data().category);
      const categoryBucket = categoryDoc.collection("documents");
      await Promise.all([
        categoryBucket.doc(snapshot.id).delete(),
        categoryDoc.update("count", admin.firestore.FieldValue.increment(-1)),
      ]);
    } catch (error) {
      functions.logger.error("Could not remove wiki-page from category bucket", error);
    }
    // ==== Delete search index ====
    try {
      const searchCollection = adminFirestore.collection("wiki-page-search-index");
      await searchCollection.doc(snapshot.id).delete();
    } catch (error) {
      functions.logger.error("Could not delete wiki-page search index", error);
    }
  });

export const onWikiUpdateFunction = functions
  .region("europe-west1")
  .firestore.document("wiki-page/{pageId}")
  .onUpdate(async (change, context) => {
    const adminFirestore = admin.firestore();
    // ==== Update search index ====
    try {
      const searchCollection = adminFirestore.collection("wiki-page-search-index");
      await searchCollection.doc(context.params.pageId).update({
        searchIndex: powerSet(change.after.data().name),
        name: change.after.data().name,
        category: change.after.data().category,
      });
    } catch (error) {
      functions.logger.error("Could not update wiki-page search index", error);
    }
  });
