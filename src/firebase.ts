import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  arrayRemove,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutCustom = () => {
  return signOut(auth);
};

export const createUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const creacteUserName = (name: string) => {
  if (auth.currentUser) {
    return updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      // Profile updated!
      // ...
    });
  }
};

export const createUsersFavoriteList = (id: string, name: string) => {
  return setDoc(doc(db, "favorites", id), {
    name,
    favGames: [],
  });
};

export const addItemToBase = async (id: number) => {
  if (auth.currentUser) {
    await updateDoc(doc(db, "favorites", auth.currentUser.uid), {
      favGames: arrayUnion(id),
    });
  }
};

export const removeItemFromBase = async (id: number) => {
  if (auth.currentUser) {
    await updateDoc(doc(db, "favorites", auth.currentUser.uid), {
      favGames: arrayRemove(id),
    });
  }
};
