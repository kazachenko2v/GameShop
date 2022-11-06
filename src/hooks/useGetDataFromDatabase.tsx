import React from "react";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getLocalStorage } from "../utils/localStorage";

export const useGetData = () => {
  const [data, setData] = React.useState<DocumentData | null>(null);
  React.useEffect(() => {
    const uid = getLocalStorage("uid");
    let unsubscribe: Function | null = null;
    if (uid) {
      unsubscribe = onSnapshot(doc(db, "games", uid), (doc) => {
        if (doc.exists()) {
          setData(doc.data());
        }
      });
    }
    return () => unsubscribe && unsubscribe();
  }, [auth.currentUser]);
  return data;
};

export const useAuthListen = () => {
  const [currentUser, setCurrentUser] = React.useState<DocumentData | null>(
    null
  );

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  return currentUser;
};
