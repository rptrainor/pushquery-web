import { useState, useEffect, createContext, useContext } from "react";
import firebase from "../firebase/clientApp";

export const UserContext = createContext();

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user;
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({ uid, displayName, email, photoURL });
          firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((doc) => {
              if (doc.data().flag.flagged === true) {
                setIsBlocked(true);
              }
            });
        } else setUser(null);
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    });

    // Unsubscribe auth listener on unmount
    return () => unsubscriber();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser, isBlocked }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorhands the context!
export const useUser = () => useContext(UserContext);
