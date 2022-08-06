import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const onProfileCreateFunction = functions
  .region("europe-west1")
  .firestore.document("profile/{profileId}")
  .onCreate(async (snapshot, context) => {
    try {
      const counter = admin.firestore().collection("counter").doc("profile");
      await counter.update("count", admin.firestore.FieldValue.increment(1));
    } catch (error) {
      functions.logger.error("Could not increment profile counter", error);
    }
  });

export const onProfileDeleteFunction = functions
  .region("europe-west1")
  .firestore.document("profile/{profileId}")
  .onDelete(async (snapshot, context) => {
    try {
      const counter = admin.firestore().collection("counter").doc("profile");
      await counter.update("count", admin.firestore.FieldValue.increment(-1));
    } catch (error) {
      functions.logger.error("Could not decrement profile counter", error);
    }
  });
