import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {onWikiCreateFunction, onWikiDeleteFunction} from "./firestore/wiki";
import {
  onCategoryCreateFunction,
  onCategoryDeleteFunction,
} from "./firestore/category";
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions
  .region("europe-west1")
  .https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("hello world");
  });

export const onWikiCreate = onWikiCreateFunction;
export const onWikiDelete = onWikiDeleteFunction;
export const onCategoryCreate = onCategoryCreateFunction;
export const onCategoryDelete = onCategoryDeleteFunction;
