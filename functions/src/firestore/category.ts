import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const onCategoryCreateFunction = functions
  .region("europe-west1")
  .firestore.document("category/{categoryId}")
  .onCreate(async (snapshot, context) => {
    try {
      const counter = admin.firestore().collection("counter").doc("category");
      await counter.update("count", admin.firestore.FieldValue.increment(1));
    } catch (error) {
      functions.logger.error("Could not increment category counter", error);
    }
  });

export const onCategoryDeleteFunction = functions
  .region("europe-west1")
  .firestore.document("category/{categoryId}")
  .onDelete(async (snapshot, context) => {
    try {
      const counter = admin.firestore().collection("counter").doc("category");
      await counter.update("count", admin.firestore.FieldValue.increment(-1));
    } catch (error) {
      functions.logger.error("Could not decrement category counter", error);
    }
  });
