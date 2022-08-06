import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const onWikiCreateFunction = functions
  .region("europe-west1")
  .firestore.document("wiki-page/{pageId}")
  .onCreate(async (snapshot, context) => {
    try {
      const counter = admin.firestore().collection("counter").doc("wiki-page");
      await counter.update("count", admin.firestore.FieldValue.increment(1));
    } catch (error) {
      functions.logger.error("Could not increment wiki-page counter", error);
    }
  });

export const onWikiDeleteFunction = functions
  .region("europe-west1")
  .firestore.document("wiki-page/{pageId}")
  .onDelete(async (snapshot, context) => {
    try {
      const counter = admin.firestore().collection("counter").doc("wiki-page");
      await counter.update("count", admin.firestore.FieldValue.increment(-1));
    } catch (error) {
      functions.logger.error("Could not decrement wiki-page counter", error);
    }
  });
