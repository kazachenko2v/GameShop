import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  arrayRemove,
  arrayUnion,
  updateDoc,
  getDoc,
  getFirestore,
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

import { getLocalStorage } from "./utils/localStorage";

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
export const storage = getStorage(app);

export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutCustom = () => {
  return signOut(auth);
};

export const createUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const createUserField = (id: string, key: string, value: any) => {
  return setDoc(
    doc(db, "games", id),
    {
      [key]: value,
    },
    { merge: true }
  );
};

export const updateUserField = async (key: string, value: any) => {
  if (auth.currentUser) {
    await updateDoc(doc(db, "games", auth.currentUser.uid), {
      [key]: value,
    });
  }
};

export const updateImage = async (value: any, setRdy: any) => {
  if (auth.currentUser) {
    await updateDoc(doc(db, "games", auth.currentUser.uid), {
      imageUrl: value,
    });
    setRdy(true);
  }
};

export const addItemToBase = async (key: string, id: number) => {
  if (auth.currentUser) {
    await updateDoc(doc(db, "games", auth.currentUser.uid), {
      [key]: arrayUnion(id),
    });
  }
};

export const removeItemFromBase = async (key: string, id: number) => {
  if (auth.currentUser) {
    await updateDoc(doc(db, "games", auth.currentUser.uid), {
      [key]: arrayRemove(id),
    });
  }
};

export const visitedListListener = async (id: number) => {
  const uid = getLocalStorage("uid");
  const gamesListsRef = doc(db, "games", uid);

  const gamesSnap = await getDoc(gamesListsRef);
  if (uid) {
    if (gamesSnap.exists()) {
      const lastVisitedGames = gamesSnap.data().lastVisitedGames;
      if (lastVisitedGames.length < 10 && !lastVisitedGames.includes(id)) {
        await updateDoc(doc(db, "games", uid), {
          lastVisitedGames: arrayUnion(id),
        });
      } else if (lastVisitedGames.includes(id)) {
        return;
      } else {
        lastVisitedGames.shift();
        lastVisitedGames.push(id);
        await updateDoc(doc(db, "games", uid), {
          lastVisitedGames: lastVisitedGames,
        });
      }
    }
  }
};
