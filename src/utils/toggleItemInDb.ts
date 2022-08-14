import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const addItemToBase = async (userId: string, id: number) => {
  await updateDoc(doc(db, "favorites", userId), {
    favGames: arrayUnion(id),
  });
};

export const removeItemToBase = async (userId: string, id: number) => {
  await updateDoc(doc(db, "favorites", userId), {
    favGames: arrayRemove(id),
  });
};
