import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth } from "../redux/authentication/selectors";
import { getDoc, doc, DocumentData, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { setUserName } from "../redux/authentication/slice";

export const useGetDataFromDatabase = () => {
  const { userId } = useSelector(getIsAuth);
  const dispatch = useDispatch();

  const [data, setData] = React.useState<DocumentData | null>(null);

  React.useEffect(() => {
    const getData = async () => {
      if (userId) {
        try {
          const docSnap = await getDoc(doc(db, "favorites", userId));
          if (docSnap.exists()) {
            setData(docSnap.data());
            dispatch(setUserName(docSnap.data().name));
          }
        } catch (er) {
          console.log(er);
        }
      }
    };

    getData();
  }, [userId]);

  return data;
};

export const useListenGamesFromDatabase = () => {
  const { userId } = useSelector(getIsAuth);

  const [gamesId, setGamesId] = React.useState<DocumentData | null>(null);

  React.useEffect(() => {
    onSnapshot(doc(db, "favorites", userId), (doc) => {
      if (doc.exists()) {
        setGamesId(doc.data());
      }
    });
  }, []);

  return gamesId;
};
