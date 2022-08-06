// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {onWikiCreateFunction, onWikiDeleteFunction} from "./firestore/wiki";
import {
  onCategoryCreateFunction,
  onCategoryDeleteFunction,
} from "./firestore/category";
import {
  onProfileCreateFunction,
  onProfileDeleteFunction,
} from "./firestore/profile";
import {createLog as createLogF} from "./api";

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const createLog = createLogF;

export const onWikiCreate = onWikiCreateFunction;
export const onWikiDelete = onWikiDeleteFunction;
export const onCategoryCreate = onCategoryCreateFunction;
export const onCategoryDelete = onCategoryDeleteFunction;
export const onProfileCreate = onProfileCreateFunction;
export const onProfileDelete = onProfileDeleteFunction;
