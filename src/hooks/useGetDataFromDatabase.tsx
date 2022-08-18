import React from "react";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const useGamesListener = () => {
  const [data, setData] = React.useState<DocumentData | null>(null);

  React.useEffect(() => {
    if (auth.currentUser?.uid) {
      const unSub = onSnapshot(
        doc(db, "favorites", auth.currentUser.uid),
        (doc) => {
          if (doc.exists()) {
            setData(doc.data());
          }
        }
      );
      return unSub;
    }
  }, [auth.currentUser?.uid]);

  return data;
};

export const useAuthListen = () => {
  const [currentUser, setCurrentUser] = React.useState<DocumentData | null>(
    null
  );

  React.useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unSub;
  }, []);

  return currentUser;
};
