import { firebaseConfig } from './firebaseCredentials';
import * as firebase from 'firebase/app';

export const app = firebase.initializeApp(firebaseConfig);

import * as authI from 'firebase/auth';
import * as dbI from 'firebase/firestore';
import * as funcI from 'firebase/functions';

export const auth = authI.getAuth(app);
export const funcs = funcI.getFunctions(app);
export const db = dbI.getFirestore(app);

export const collections = {
  profiles: dbI.collection(db, 'profiles'),
  wikiPage: dbI.collection(db, 'wiki-page'),
  categories: dbI.collection(db, 'categories'),
}