import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const onCategoryCreateFunction = functions
  .region("europe-west1")
  .firestore.document("category/{categoryId}")
  .onCreate(async (snapshot, context) => {
    const adminFirestore = admin.firestore();
    try {
      const counter = adminFirestore.collection("counter").doc("category");
      await counter.update("count", admin.firestore.FieldValue.increment(1));
    } catch (error) {
      functions.logger.error("Could not increment category counter", error);
    }
    try {
      const categoryBucketCollection = adminFirestore.collection(
        "wiki-page-bucket-by-category",
      );
      const categoryBucket = categoryBucketCollection.doc(snapshot.id);
      await categoryBucket.set({
        count: 0,
      });
      try {
        const categoryBucketDocumentsCollection =
          categoryBucket.collection("documents");
        const pagesCollection = adminFirestore.collection("wiki-page");
        const pages = await pagesCollection.where("category", "==", snapshot.id).get();
        await Promise.all(pages.docs.map(async (page) => {
          await categoryBucketDocumentsCollection.doc(page.id).set({
            lastRevision: page.data().lastRevision,
            name: page.data().name,
          });
        }));
      } catch (error) {
        functions.logger.error(
          "Could not insert existing documents into category-bucket",
          error,
        );
      }
    } catch (error) {
      functions.logger.error("Could not create category-bucket", error);
    }
  });

export const onCategoryDeleteFunction = functions
  .region("europe-west1")
  .firestore.document("category/{categoryId}")
  .onDelete(async (snapshot, context) => {
    const adminFirestore = admin.firestore();
    try {
      const counter = adminFirestore.collection("counter").doc("category");
      await counter.update("count", admin.firestore.FieldValue.increment(-1));
    } catch (error) {
      functions.logger.error("Could not decrement category counter", error);
    }
    try {
      const categoryBucketCollection = adminFirestore.collection(
        "wiki-page-bucket-by-category",
      );
      const categoryBucket = categoryBucketCollection.doc(snapshot.id);
      await categoryBucket.delete();
    } catch (error) {
      functions.logger.error("Could not delete category-bucket", error);
    }
  });
